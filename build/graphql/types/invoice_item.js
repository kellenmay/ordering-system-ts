import { getInvoice } from '../../utils';
export class InvoiceItem {
    _invoice_number;
    _line_number;
    _item_id;
    _quantity;
    _price;
    constructor(args) {
        this._invoice_number = args.invoiceNumber;
        this._line_number = args.lineNumber;
        this._item_id = args.itemId;
        this._quantity = args.quantity;
        this._price = args.price.toString();
    }
    get id() {
        return `"Invoice Number" + ${this._invoice_number}|"Line number" + ${this._line_number}`;
    }
    get lineNumber() {
        return this._line_number;
    }
    async invoice(args, context) {
        try {
            if (this._invoice_number) {
                const invoice = await getInvoice(this._invoice_number);
                return invoice; // REFACTOR TO RETURN CUSTOMER CLASS
            }
            return null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async item(args, context) {
        try {
            const invoiceItems = await context.connection.query(`SELECT * FROM inventory WHERE inventory.item_number = ${this._item_id}`);
            // console.log('the invoice item', invoiceItems);
            return invoiceItems;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    get quantity() {
        return this._quantity;
    }
    get price() {
        return this._price;
    }
}
