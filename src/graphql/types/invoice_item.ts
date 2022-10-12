import { InventoryRepo, InvoiceRepo } from '../../repos';
import type { Context } from '../../utils';
import { Inventory } from './inventory';
import { Invoice } from './invoice';
export class InvoiceItem {
  private _invoiceNumber: string;
  private _lineNumber: string | null;
  private _itemId: string | null;
  private _quantity: number | null;
  private _price: number | null;

  constructor(args: InvoiceItemConstructorArgs) {
    this._invoiceNumber = args.invoiceNumber;
    this._lineNumber = args.lineNumber;
    this._itemId = args.itemId;
    this._quantity = args.quantity;
    this._price = args.price;
  }

  public get id() {
    return `"Invoice Number" + ${this._invoiceNumber}|"Line number" + ${this._lineNumber}`;
  }

  public get lineNumber() {
    return this._lineNumber;
  }

  public async invoice(
    args: unknown,
    context: Context,
  ): Promise<Invoice | null> {
    try {
      const repo = new InvoiceRepo(context.connection);
      const invoice = await repo.get(this._invoiceNumber);
      const dto = invoice.getState();
      return new Invoice(dto);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async item(
    args: unknown,
    context: Context,
  ): Promise<Inventory | null> {
    try {
      if (this._itemId) {
        const repo = new InventoryRepo(context.connection);
        const inventory = await repo.get(this._itemId);
        const dto = inventory.getState();
        return new Inventory(dto);
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public get quantity() {
    return this._quantity;
  }

  public get price() {
    return this._price;
  }
}

interface InvoiceItemConstructorArgs {
  invoiceNumber: string;
  lineNumber: string | null;
  itemId: string | null;
  quantity: number | null;
  price: number | null;
}
