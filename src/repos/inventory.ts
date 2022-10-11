import { Connection, format, RowDataPacket } from 'mysql2/promise';
import { Inventory } from '../aggregates';

export class InventoryRepo {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public async get(id: string): Promise<Inventory> {
    let stmt = format(`SELECT * FROM inventory WHERE inventory.id = ?;`, [id]);

    const [[inventoryRow]] = await this._connection.query<InventoryRow[]>(stmt);

    if (!inventoryRow) {
      throw new Error(`No inventory found for id ${id}`);
    }

    const dto: InventoryDTO = {
      id: inventoryRow.id.toString(),
      itemNumber: inventoryRow.item_number,
      make: inventoryRow.make,
      msrp: inventoryRow.msrp,
      itemDescription: inventoryRow.item_description,
    };

    return new Inventory(dto);
  }

  public async save(inventory: Inventory): Promise<void> {
    const dto = inventory.getState();

    let stmt = format(
      `
      INSERT INTO inventory (id, item_number, make, msrp, item_description) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        item_number = VALUES(item_number),
        make = VALUES(make),
        msrp = VALUES(msrp),
        item_description = VALUES(item_description);
    `,
      [dto.id, dto.itemNumber, dto.make, dto.msrp, dto.itemDescription],
    );

    await this._connection.query(stmt);
  }
}

export interface InventoryDTO {
  id: string;
  itemNumber: string | null;
  make: string | null;
  msrp: number | null;
  itemDescription: string | null;
}

export interface InventoryRow extends RowDataPacket {
  id: number;
  item_number: string | null;
  make: string | null;
  msrp: number | null;
  item_description: string | null;
}
