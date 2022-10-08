import { InventoryRepo, InvoiceRepo } from '../../repos';
import { Inventory } from './inventory';
import { Invoice } from './invoice';
export class InvoiceItem {
    _invoiceNumber;
    _lineNumber;
    _itemId;
    _quantity;
    _price;
    constructor(args) {
        this._invoiceNumber = args.invoiceNumber;
        this._lineNumber = args.lineNumber;
        this._itemId = args.itemId;
        this._quantity = args.quantity;
        this._price = args.price;
    }
    get id() {
        return `"Invoice Number" + ${this._invoiceNumber}|"Line number" + ${this._lineNumber}`;
    }
    get lineNumber() {
        return this._lineNumber;
    }
    async invoice(args, context) {
        try {
            const repo = new InvoiceRepo(context.connection);
            const invoice = await repo.get(this._invoiceNumber);
            const dto = invoice.getState();
            return new Invoice(dto);
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async item(args, context) {
        try {
            if (this._itemId) {
                const repo = new InventoryRepo(context.connection);
                const inventory = await repo.get(this._itemId);
                const dto = inventory.getState();
                return new Inventory(dto);
            }
            return null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    get quantity() {
        return this._quantity;
    }
    get price() {
        return this._price;
    }
}
