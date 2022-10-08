import type { CustomerDTO } from '../repos';

export class Customer {
  private _id: string;
  private _name: string | null;
  private _email: string | null;
  private _address: string | null;
  private _phoneNumber: string | null;

  constructor(args: CustomerDTO) {
    this._id = args.id;
    this._name = args.name;
    this._email = args.email;
    this._address = args.address;
    this._phoneNumber = args.phoneNumber;
  }

  public getState(): CustomerDTO {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      address: this._address,
      phoneNumber: this._phoneNumber,
    };
  }
}
