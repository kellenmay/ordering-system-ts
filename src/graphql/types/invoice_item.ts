import type { InvoiceItemDTO } from '../../repos';
import type { Context } from '../../utils';
import { getInvoice } from '../../utils';
export class InvoiceItem {
  private _invoice_number: string;
  private _line_number: string | null;
  private _item_id: string | null;
  // private _quantity: string | null;
  // private _price: string | null;

  constructor(args: InvoiceItemDTO) {
    this._invoice_number = args.invoiceNumber;
    this._line_number = args.lineNumber;
    this._item_id = args.itemId;
    // this._quantity = args.quantity;
    // this._price = args.price.toString();
  }

  public get id() {
    return `"Invoice Number" + ${this._invoice_number}|"Line number" + ${this._line_number}`;
  }
  public get lineNumber() {
    return this._line_number;
  }
  public async invoice(args: unknown, context: Context): Promise<any> {
    try {
      if (this._invoice_number) {
        const invoice = await getInvoice(this._invoice_number);
        return invoice; // REFACTOR TO RETURN CUSTOMER CLASS
      }

      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async item(args: unknown, context: Context): Promise<any[]> {
    try {
      const invoiceItems = await context.connection.query<any[]>(
        `SELECT * FROM inventory WHERE inventory.item_number = ${this._item_id}`,
      );
      // console.log('the invoice item', invoiceItems);
      return invoiceItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public get quantity() {
    return this._quantity;
  }
  public get price() {
    return this._price;
  }
}
