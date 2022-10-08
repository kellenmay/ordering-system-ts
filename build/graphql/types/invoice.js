import { CustomerRepo } from '../../repos';
import { Customer } from './customer';
export class Invoice {
    _id;
    _customerId;
    _dateOfSale;
    constructor(args) {
        this._id = args.id;
        this._customerId = args.customerId;
        this._dateOfSale = args.dateOfSale;
    }
    get id() {
        return this._id;
    }
    async customer(args, context) {
        try {
            if (this._customerId) {
                const repo = new CustomerRepo(context.connection);
                const customer = await repo.get(this._customerId);
                const dto = customer.getState();
                return new Customer(dto);
            }
            return null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    get dateOfSale() {
        return this._dateOfSale;
    }
    // REFACTOR TO USE INVOICEITEM CLASS
    async lines(args, context) {
        try {
            const [invoiceItemRows = []] = await context.connection.query('SELECT * FROM invoice_item WHERE invoice_item.invoice_number = ?;', [this._id]);
            return invoiceItemRows.map((row) => ({
                id: `"Invoice Number" + ${row.invoice_number}|"Line number" + ${row.line_number}` ??
                    null,
                quantity: row.quantity ?? null,
                price: row.price ?? null,
            }));
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
}
