import { format } from 'mysql2/promise';
import { Customer } from '../aggregates';
export class CustomerRepo {
    _connection;
    constructor(connection) {
        this._connection = connection;
    }
    async get(id) {
        let stmt = format(`SELECT * FROM customer WHERE customer.id = ?;`, [id]);
        const [[customerRow]] = await this._connection.query(stmt);
        if (!customerRow) {
            throw new Error(`No customer found for id ${id}`);
        }
        const dto = {
            id: customerRow.id.toString(),
            name: customerRow.name,
            email: customerRow.email,
            address: customerRow.address,
            phoneNumber: customerRow.phone_number,
        };
        return new Customer(dto);
    }
    async save(customer) {
        const dto = customer.getState();
        let stmt = format(`
      INSERT INTO customer (id, name, email, address, phone_number) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        email = VALUES(email),
        address = VALUES(address),
        phone_number = VALUES(phone_number);
    `, [dto.id, dto.name, dto.email, dto.address, dto.phoneNumber]);
        await this._connection.query(stmt);
    }
    async getCustomerId() {
        const [res] = await this._connection.query(`INSERT INTO customer (name, email, address, phone_number) VALUES (NULL, NULL, NULL, NULL);`);
        const insertId = res.insertId;
        console.log({ insertId });
        return insertId.toString();
    }
    async deleteCustomer(id) {
        await this._connection.query(`DELETE FROM customer WHERE id = ?;`, [id]);
    }
}
