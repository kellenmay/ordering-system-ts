import type { CustomerDTO } from '../../repos';
import type { Context } from '../../utils';

export class Customer {
  private _id: string | null;
  private _name: string | null;
  private _address: string | null;
  private _email: string | null;
  private _phoneNumber: string | null;

  constructor(args: CustomerDTO) {
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
  public async invoices(args: unknown, context: Context): Promise<any> {
    try {
      const [invoice = []] = await context.connection.query<any[]>(
        'SELECT * FROM invoice WHERE invoice.customer_id = ?;',
        [this._id],
      );

      return invoice.map((row) => ({
        id: `"Invoice " + ${row.id}` ?? null,
      }));
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
