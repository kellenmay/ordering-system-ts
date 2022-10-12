import { CustomerRepo, InvoiceRepo } from '../../repos';
import type { Context } from '../../utils';
import { Customer } from './customer';
import { InvoiceItem } from './invoice_item';

export class Invoice {
  private _id: string;
  private _customerId: string | null;
  private _dateOfSale: string | null;

  constructor(args: InvoiceConstructorArgs) {
    this._id = args.id;
    this._customerId = args.customerId;
    this._dateOfSale = args.dateOfSale;
  }

  public get id() {
    return this._id;
  }

  public async customer(
    args: unknown,
    context: Context,
  ): Promise<Customer | null> {
    try {
      if (this._customerId) {
        const repo = new CustomerRepo(context.connection);
        const customer = await repo.get(this._customerId);
        const dto = customer.getState();
        return new Customer(dto);
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public get dateOfSale() {
    return this._dateOfSale;
  }

  public async lines(args: unknown, context: Context): Promise<InvoiceItem[]> {
    try {
      const repo = new InvoiceRepo(context.connection);
      const invoice = await repo.get(this._id);
      const dto = invoice.getState();
      return dto.invoiceItems.map((item) => new InvoiceItem(item));
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

interface InvoiceConstructorArgs {
  id: string;
  customerId: string | null;
  dateOfSale: string | null;
}
