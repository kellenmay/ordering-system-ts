import type { InvoiceDTO } from '../repos';

export class Invoice {
  private _id: string;
  private _customerId: string | null;
  private _dateOfSale: Date | null;
  private _invoiceItems: InvoiceItem[];

  constructor(args: InvoiceDTO) {
    this._id = args.id;
    this._customerId = args.customerId;
    this._dateOfSale = args.dateOfSale ? new Date(args.dateOfSale) : null;
    this._invoiceItems = args.invoiceItems;
  }

  public getState(): InvoiceDTO {
    return {
      id: this._id,
      customerId: this._customerId,
      dateOfSale: this._dateOfSale ? this._dateOfSale.toISOString() : null,
      invoiceItems: this._invoiceItems,
    };
  }

  public createInvoiceItem(args: {
    lineNumber: number;
    itemId?: string | null;
    quantity?: number | null;
    price?: number | null;
  }): void {
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

  public updateInvoice(args: {
    customerId?: string | null | undefined;
    dateOfSale?: string | null | undefined;
  }): void {
    if (args.customerId !== undefined) {
      this._customerId = args.customerId;
    }

    if (args.dateOfSale !== undefined) {
      if (args.dateOfSale !== null) {
        this._dateOfSale = new Date(args.dateOfSale);
      } else {
        this._dateOfSale = null;
      }
    }
  }
}

interface InvoiceItem {
  invoiceNumber: string;
  lineNumber: string;
  itemId: string | null;
  quantity: number | null;
  price: number | null;
}
