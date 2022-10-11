import { connection } from '../database';
import { InventoryDTO, InventoryRepo } from '../repos';
import type { UpdateInventoryArgs } from '../utils';

export async function updateInventory(
  args: UpdateInventoryArgs,
): Promise<InventoryDTO> {
  try {
    await connection.beginTransaction();

    const repo = new InventoryRepo(connection);
    const inventory = await repo.get(args.id.toString());

    inventory.updateInventory({
      itemNumber: args.itemNumber,
      make: args.make,
      msrp: args.msrp,
      itemDescription: args.itemDescription,
    });

    await repo.save(inventory);

    await connection.commit();

    const updatedInventory = inventory.getState();

    if (!updatedInventory) {
      throw new Error('No new line updated');
    }

    await connection.release();

    return updatedInventory;
  } catch (err: unknown) {
    await connection.rollback();
    await connection.destroy();

    throw Error(`Error updating inventory: ${err}`);
  }
}
