export class Invoice {
    _id;
    _customerId;
    _dateOfSale;
    _invoiceItems;
    constructor(args) {
        this._id = args.id;
        this._customerId = args.customerId;
        this._dateOfSale = args.dateOfSale ? new Date(args.dateOfSale) : null;
        this._invoiceItems = args.invoiceItems;
    }
    getState() {
        return {
            id: this._id,
            customerId: this._customerId,
            dateOfSale: this._dateOfSale ? this._dateOfSale.toISOString() : null,
            invoiceItems: this._invoiceItems,
        };
    }
    createInvoiceItem(args) {
        this._invoiceItems.push({
            invoiceNumber: this._id,
            lineNumber: args.lineNumber.toString(),
            itemId: args.itemId ?? null,
            quantity: args.quantity ?? null,
            price: args.price ?? null,
        });
    }
    // public createInvoice(args:{
    // }),: void {
    //   this._invoiceItems.push({
    //     customerId: this.customerId,
    //     quantity: args.quantity ?? null,
    //     price: args.price ?? null,
    //   });
    // }
    updateInvoice(args) {
        if (args.customerId !== undefined) {
            this._customerId = args.customerId;
        }
        if (args.dateOfSale !== undefined) {
            if (args.dateOfSale !== null) {
                this._dateOfSale = new Date(args.dateOfSale);
            }
            else {
                this._dateOfSale = null;
            }
        }
    }
}
