import { formatISO9075 } from 'date-fns';
import { format } from 'mysql2/promise';
import { Invoice } from '../aggregates';
export class InvoiceRepo {
    _connection;
    constructor(connection) {
        this._connection = connection;
    }
    async get(id) {
        let stmt = format(`
      SET @invoiceId = ?;

      SELECT * FROM invoice WHERE invoice.id = @invoiceId;

      SELECT * FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;
    `, [id]);
        const [[, [invoiceRow], invoiceItemRows]] = await this._connection.query(stmt);
        if (!invoiceRow) {
            throw new Error(`No invoice found for id ${id}`);
        }
        const dto = {
            id: invoiceRow.id.toString(),
            customerId: invoiceRow.customer_id?.toString() ?? null,
            dateOfSale: invoiceRow.date_of_sale,
            invoiceItems: invoiceItemRows.map((row) => ({
                invoiceNumber: row.invoice_number.toString(),
                lineNumber: row.line_number.toString(),
                itemId: row.item_id?.toString() ?? null,
                quantity: row.quantity ?? null,
                price: row.price ?? null,
            })),
        };
        return new Invoice(dto);
    }
    async save(invoice) {
        const dto = invoice.getState();
        let stmt = format(`
      SET @invoiceId = ?;

      DELETE FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;

      INSERT INTO invoice (id, customer_id, date_of_sale) VALUES (@invoiceId, ?, ?)
      ON DUPLICATE KEY UPDATE
        customer_id = VALUES(customer_id),
        date_of_sale = VALUES(date_of_sale);
    `, [
            dto.id,
            dto.customerId,
            dto.dateOfSale ? formatISO9075(new Date(dto.dateOfSale)) : null,
        ]);
        await this._connection.query(stmt);
        if (dto.invoiceItems.length > 0) {
            stmt = format(`
        INSERT INTO invoice_item (
          invoice_number, 
          line_number, 
          item_id, 
          quantity, 
          price
        ) VALUES ?;
      `, [
                dto.invoiceItems.map((item) => [
                    item.invoiceNumber,
                    item.lineNumber,
                    item.itemId,
                    item.quantity,
                    item.price,
                ]),
            ]);
            await this._connection.query(stmt);
        }
    }
    async getInvoiceId() {
        const [res] = await this._connection.query(`INSERT INTO invoice (customer_id, date_of_sale) VALUES (NULL, NULL);`);
        const insertId = res.insertId;
        return insertId.toString();
    }
    async deleteInvoice(id) {
        await this._connection.query(`
      SET @invoiceId = ?;

      DELETE FROM invoice WHERE id = @invoiceId;
    
      DELETE FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;
    `, [id]);
    }
}
