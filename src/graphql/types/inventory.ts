export class Inventory {
  private _id: string;
  private _itemNumber: string | null;
  private _make: string | null;
  private _msrp: number | null;
  private _itemDescription: string | null;

  constructor(args: InventoryConstructorArgs) {
    this._id = args.id;
    this._itemNumber = args.itemNumber;
    this._make = args.make;
    this._msrp = args.msrp;
    this._itemDescription = args.itemDescription;
  }

  public get id() {
    return this._id;
  }
  public get itemNumber() {
    return this._itemNumber;
  }
  public get make() {
    return this._make;
  }
  public get msrp() {
    return this._msrp;
  }
  public get itemDescription() {
    return this._itemDescription;
  }
}

interface InventoryConstructorArgs {
  id: string;
  itemNumber: string | null;
  make: string | null;
  msrp: number | null;
  itemDescription: string | null;
}
