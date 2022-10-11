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

  public createCustomer(args: {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
  }): void {
    this._name = args.name;
    this._email = args.email;
    this._address = args.address;
    this._phoneNumber = args.phoneNumber;
  }

  public updateCustomer(args: {
    name?: string | null;
    email?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
  }): void {
    {
      if (args.name !== undefined) {
        this._name = args.name;
      }

      if (args.email !== undefined) {
        this._email = args.email;
      }

      if (args.address !== undefined) {
        this._address = args.address;
      }

      if (args.phoneNumber !== undefined) {
        this._phoneNumber = args.phoneNumber;
      }
    }
  }
}
