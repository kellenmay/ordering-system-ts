import { Invoice } from './invoice';
export class Customer {
    _id;
    _name;
    _address;
    _email;
    _phoneNumber;
    constructor(args) {
        this._id = args.id;
        this._name = args.name;
        this._address = args.address;
        this._email = args.email;
        this._phoneNumber = args.phoneNumber;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get address() {
        return this._address;
    }
    get email() {
        return this._email;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    async invoices(args, context) {
        try {
            const [rows] = await context.connection.query(`SELECT * FROM invoice WHERE invoice.customer_id = ?;`, [this.id]);
            return rows.map((row) => new Invoice({
                id: row.id.toString(),
                customerId: row.customer_id?.toString() ?? null,
                dateOfSale: row.date_of_sale ?? null,
            }));
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
}
