import { connection } from '../database';
import { InventoryDTO, InventoryRepo } from '../repos';
import type { CreateInventoryArgs } from '../utils';

export async function createInventory(
  args: CreateInventoryArgs,
): Promise<InventoryDTO> {
  try {
    await connection.beginTransaction();
    const repo = new InventoryRepo(connection);
    const inventoryId = await repo.getInventoryId();
    const inventory = await repo.get(inventoryId);

    inventory.createInventory({
      itemNumber: args.itemNumber,
      make: args.make,
      msrp: args.msrp,
      itemDescription: args.itemDescription,
    });
    await repo.save(inventory);
    await connection.commit();
    const createdInventory = inventory.getState();

    if (!createdInventory) {
      throw new Error('No new line created');
    }
    await connection.release();
    return createdInventory;
  } catch (err) {
    await connection.rollback();
    await connection.destroy();
    throw Error(`Error creating inventory: ${err}`);
  }
}
