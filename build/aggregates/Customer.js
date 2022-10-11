export class Customer {
    _id;
    _name;
    _email;
    _address;
    _phoneNumber;
    constructor(args) {
        this._id = args.id;
        this._name = args.name;
        this._email = args.email;
        this._address = args.address;
        this._phoneNumber = args.phoneNumber;
    }
    getState() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            address: this._address,
            phoneNumber: this._phoneNumber,
        };
    }
    createCustomer(args) {
        this._name = args.name;
        this._email = args.email;
        this._address = args.address;
        this._phoneNumber = args.phoneNumber;
    }
    updateCustomer(args) {
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
