import type { InvoiceRow } from '../../repos';
import type { Context } from '../../utils';
import { Invoice } from './invoice';
export class Customer {
  private _id: string;
  private _name: string | null;
  private _address: string | null;
  private _email: string | null;
  private _phoneNumber: string | null;

  constructor(args: CustomerConstructorArgs) {
    this._id = args.id;
    this._name = args.name;
    this._address = args.address;
    this._email = args.email;
    this._phoneNumber = args.phoneNumber;
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get address() {
    return this._address;
  }
  public get email() {
    return this._email;
  }
  public get phoneNumber() {
    return this._phoneNumber;
  }
  public async invoices(
    args: unknown,
    context: Context,
  ): Promise<Invoice[] | null> {
    try {
      const [rows] = await context.connection.query<InvoiceRow[]>(
        `SELECT * FROM invoice WHERE invoice.customer_id = ?;`,
        [this.id],
      );
      return rows.map(
        (row) =>
          new Invoice({
            id: row.id.toString(),
            customerId: row.customer_id?.toString() ?? null,
            dateOfSale: row.date_of_sale ?? null,
          }),
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

interface CustomerConstructorArgs {
  id: string;
  name: string | null;
  address: string | null;
  email: string | null;
  phoneNumber: string | null;
}
