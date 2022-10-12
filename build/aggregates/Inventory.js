export class Inventory {
    _id;
    _itemNumber;
    _make;
    _msrp;
    _itemDescription;
    constructor(args) {
        this._id = args.id;
        this._itemNumber = args.itemNumber;
        this._make = args.make;
        this._msrp = args.msrp;
        this._itemDescription = args.itemDescription;
    }
    getState() {
        return {
            id: this._id,
            itemNumber: this._itemNumber,
            make: this._make,
            msrp: this._msrp,
            itemDescription: this._itemDescription,
        };
    }
    createInventory(args) {
        this._itemNumber = args.itemNumber;
        this._make = args.make;
        this._msrp = args.msrp;
        this._itemDescription = args.itemDescription;
    }
    updateInventory(args) {
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
