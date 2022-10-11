import { Connection, format, OkPacket, RowDataPacket } from 'mysql2/promise';
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

  public async save(customer: Customer): Promise<void> {
    const dto = customer.getState();

    let stmt = format(
      `
      INSERT INTO customer (id, name, email, address, phone_number) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        email = VALUES(email),
        address = VALUES(address),
        phone_number = VALUES(phone_number);
    `,
      [dto.id, dto.name, dto.email, dto.address, dto.phoneNumber],
    );

    await this._connection.query(stmt);
  }

  public async getCustomerId(): Promise<string> {
    const [res] = await this._connection.query<OkPacket>(
      `INSERT INTO customer (name, email, address, phone_number) VALUES (NULL, NULL, NULL, NULL);`,
    );
    const insertId = res.insertId;
    console.log({ insertId });
    return insertId.toString();
  }

  public async deleteCustomer(id: string): Promise<void> {
    await this._connection.query(`DELETE FROM customer WHERE id = ?;`, [id]);
  }
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
