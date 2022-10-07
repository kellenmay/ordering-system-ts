import { formatISO9075 } from 'date-fns';
import { Connection, format, RowDataPacket } from 'mysql2/promise';
import { Invoice } from '../aggregates';

export class InvoiceRepo {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public async get(id: string): Promise<Invoice> {
    let stmt = format(
      `
      SET @invoiceId = ?;

      SELECT * FROM invoice WHERE invoice.id = @invoiceId;

      SELECT * FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;
    `,
      [id],
    );

    const [[, [invoiceRow], invoiceItemRows]] = await this._connection.query<
      [any, InvoiceRow[], InvoiceItemRow[]]
    >(stmt);

    if (!invoiceRow) {
      throw new Error(`No invoice found for id ${id}`);
    }

    const dto: InvoiceDTO = {
      id: invoiceRow.id.toString(),
      customerId: invoiceRow.customer_id?.toString() ?? null,
      dateOfSale: invoiceRow.date_of_sale,
      invoiceItems: invoiceItemRows.map(
        (row): InvoiceItemDTO => ({
          invoiceNumber: row.invoice_number.toString(),
          lineNumber: row.line_number.toString(),
          itemId: row.item_id?.toString() ?? null,
          quantity: row.quantity ?? null,
          price: row.price ?? null,
        }),
      ),
    };

    return new Invoice(dto);
  }

  public async save(invoice: Invoice): Promise<void> {
    const dto = invoice.getState();

    let stmt = format(
      `
      SET @invoiceId = ?;

      DELETE FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;

      INSERT INTO invoice (id, customer_id, date_of_sale) VALUES (@invoiceId, ?, ?)
      ON DUPLICATE KEY UPDATE
        customer_id = VALUES(customer_id),
        date_of_sale = VALUES(date_of_sale);
    `,
      [
        dto.id,
        dto.customerId,
        dto.dateOfSale ? formatISO9075(new Date(dto.dateOfSale)) : null,
      ],
    );

    await this._connection.query(stmt);

    if (dto.invoiceItems.length > 0) {
      stmt = format(
        `
        INSERT INTO invoice_item (
          invoice_number, 
          line_number, 
          item_id, 
          quantity, 
          price
        ) VALUES ?;
      `,
        [
          dto.invoiceItems.map((item) => [
            item.invoiceNumber,
            item.lineNumber,
            item.itemId,
            item.quantity,
            item.price,
          ]),
        ],
      );

      await this._connection.query(stmt);
    }
  }
}

interface InvoiceRow extends RowDataPacket {
  id: number;
  customer_id: number | null;
  date_of_sale: string | null;
}

interface InvoiceItemRow extends RowDataPacket {
  invoice_number: number;
  line_number: number;
  item_id: number | null;
  quantity: number | null;
  price: number | null;
}

export interface InvoiceDTO {
  id: string;
  customerId: string | null;
  dateOfSale: string | null;
  invoiceItems: InvoiceItemDTO[];
}

export interface InvoiceItemDTO {
  invoiceNumber: string;
  lineNumber: string;
  itemId: string | null;
  quantity: number | null;
  price: number | null;
}
