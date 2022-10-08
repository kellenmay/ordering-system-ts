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
}