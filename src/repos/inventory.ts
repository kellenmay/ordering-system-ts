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

  // public async save(invoice: Invoice): Promise<void> {
  //   const dto = invoice.getState();

  //   let stmt = format(
  //     `
  //     SET @invoiceId = ?;

  //     DELETE FROM invoice_item WHERE invoice_item.invoice_number = @invoiceId;

  //     INSERT INTO invoice (id, customer_id, date_of_sale) VALUES (@invoiceId, ?, ?)
  //     ON DUPLICATE KEY UPDATE
  //       customer_id = VALUES(customer_id),
  //       date_of_sale = VALUES(date_of_sale);
  //   `,
  //     [
  //       dto.id,
  //       dto.customerId,
  //       dto.dateOfSale ? formatISO9075(new Date(dto.dateOfSale)) : null,
  //     ],
  //   );

  //   await this._connection.query(stmt);

  //   if (dto.invoiceItems.length > 0) {
  //     stmt = format(
  //       `
  //       INSERT INTO invoice_item (
  //         invoice_number,
  //         line_number,
  //         item_id,
  //         quantity,
  //         price
  //       ) VALUES ?;
  //     `,
  //       [
  //         dto.invoiceItems.map((item) => [
  //           item.invoiceNumber,
  //           item.lineNumber,
  //           item.itemId,
  //           item.quantity,
  //           item.price,
  //         ]),
  //       ],
  //     );

  //     await this._connection.query(stmt);
  //   }
  // }
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
