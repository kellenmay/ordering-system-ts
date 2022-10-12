import { CustomerRepo, InvoiceRepo } from '../../repos';
import { Customer } from './customer';
import { InvoiceItem } from './invoice_item';
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
    async lines(args, context) {
        try {
            const repo = new InvoiceRepo(context.connection);
            const invoice = await repo.get(this._id);
            const dto = invoice.getState();
            return dto.invoiceItems.map((item) => new InvoiceItem(item));
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
}
