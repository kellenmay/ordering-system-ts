import type { InventoryDTO } from '../repos';

export class Inventory {
  private _id: string;
  private _itemNumber: string | null;
  private _make: string | null;
  private _msrp: number | null;
  private _itemDescription: string | null;

  constructor(args: InventoryDTO) {
    this._id = args.id;
    this._itemNumber = args.itemNumber;
    this._make = args.make;
    this._msrp = args.msrp;
    this._itemDescription = args.itemDescription;
  }

  public getState(): InventoryDTO {
    return {
      id: this._id,
      itemNumber: this._itemNumber,
      make: this._make,
      msrp: this._msrp,
      itemDescription: this._itemDescription,
    };
  }

  public updateInventory(args: {
    itemNumber: string | null;
    make: string | null;
    msrp: number | null;
    itemDescription: string | null;
  }): void {
    if (args.itemNumber !== undefined) {
      this._itemNumber = args.itemNumber;
    }
    if (args.make !== undefined) {
      this._make = args.make;
    }
    if (args.msrp !== undefined) {
      this._msrp = args.msrp;
    }
    if (args.itemDescription !== undefined) {
      this._itemDescription = args.itemDescription;
    }
  }
}
