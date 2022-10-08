import type { InvoiceDTO } from '../../repos';
import { CustomerRepo } from '../../repos';
import type { Context } from '../../utils';
import { Customer } from './customer';

export class Invoice {
  private _id: string;
  private _customerId: string | null;
  private _dateOfSale: string | null;

  constructor(args: InvoiceDTO) {
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

  // REFACTOR TO USE INVOICEITEM CLASS
  public async lines(args: unknown, context: Context): Promise<any[]> {
    try {
      const [invoiceItemRows = []] = await context.connection.query<any[]>(
        'SELECT * FROM invoice_item WHERE invoice_item.invoice_number = ?;',
        [this._id],
      );

      return invoiceItemRows.map((row) => ({
        id:
          `"Invoice Number" + ${row.invoice_number}|"Line number" + ${row.line_number}` ??
          null,
        quantity: row.quantity ?? null,
        price: row.price ?? null,
      }));
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
