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
}
