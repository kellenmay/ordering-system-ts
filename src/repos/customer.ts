import { Connection, format, RowDataPacket } from 'mysql2/promise';
import { Customer } from '../aggregates';

export class CustomerRepo {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public async get(id: string): Promise<Customer> {
    let stmt = format(`SELECT * FROM customer WHERE customer.id = ?;`, [id]);

    const [[customerRow]] = await this._connection.query<CustomerRow[]>(stmt);

    if (!customerRow) {
      throw new Error(`No customer found for id ${id}`);
    }

    const dto: CustomerDTO = {
      id: customerRow.id.toString(),
      name: customerRow.name,
      email: customerRow.email,
      address: customerRow.address,
      phoneNumber: customerRow.phone_number,
    };

    return new Customer(dto);
  }

  // public async save(invoice: Invoice): Promise<void> {
  //   const dto = invoice.getState();

  //   let stmt = format(
  //     `
  //     SET @invoiceId = ?;

  //     DELETE FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;

  //     INSERT INTO invoice (id, customer_id, date_of_sale) VALUES (@invoiceId, ?, ?)
  //     ON DUPLICATE KEY UPDATE
  //       customer_id = VALUES(customer_id),
  //       date_of_sale = VALUES(date_of_sale);
  //   `,
  //     [
  //       dto.id,
  //       dto.customerId,
  //       dto.dateOfSale ? formatISO9075(new Date(dto.dateOfSale)) : null,
  //     ],
  //   );

  //   await this._connection.query(stmt);

  //   if (dto.invoiceItems.length > 0) {
  //     stmt = format(
  //       `
  //       INSERT INTO invoice_item (
  //         invoice_number,
  //         line_number,
  //         item_id,
  //         quantity,
  //         price
  //       ) VALUES ?;
  //     `,
  //       [
  //         dto.invoiceItems.map((item) => [
  //           item.invoiceNumber,
  //           item.lineNumber,
  //           item.itemId,
  //           item.quantity,
  //           item.price,
  //         ]),
  //       ],
  //     );

  //     await this._connection.query(stmt);
  //   }
  // }
}

export interface CustomerDTO {
  id: string;
  name: string | null;
  address: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface CustomerRow extends RowDataPacket {
  id: number;
  name: string | null;
  address: string | null;
  email: string | null;
  phone_number: string | null;
}
