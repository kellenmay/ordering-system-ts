import { format } from 'mysql2/promise';
import { Inventory } from '../aggregates';
export class InventoryRepo {
    _connection;
    constructor(connection) {
        this._connection = connection;
    }
    async get(id) {
        let stmt = format(`SELECT * FROM inventory WHERE inventory.id = ?;`, [id]);
        const [[inventoryRow]] = await this._connection.query(stmt);
        if (!inventoryRow) {
            throw new Error(`No inventory found for id ${id}`);
        }
        const dto = {
            id: inventoryRow.id.toString(),
            itemNumber: inventoryRow.item_number,
            make: inventoryRow.make,
            msrp: inventoryRow.msrp,
            itemDescription: inventoryRow.item_description,
        };
        return new Inventory(dto);
    }
}
