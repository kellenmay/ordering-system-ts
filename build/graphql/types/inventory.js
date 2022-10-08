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
    get id() {
        return this._id;
    }
    get itemNumber() {
        return this._itemNumber;
    }
    get make() {
        return this._make;
    }
    get msrp() {
        return this._msrp;
    }
    get itemDescription() {
        return this._itemDescription;
    }
}
