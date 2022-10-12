import { connection } from '../database';
import { InventoryRepo } from '../repos';

export async function deleteInventory(id: string): Promise<void> {
  try {
    await connection.beginTransaction();
    const repo = new InventoryRepo(connection);
    await repo.deleteInventory(id);
    await connection.commit();
    await connection.release();
  } catch (err) {
    await connection.rollback();
    await connection.destroy();
    throw Error(`Error deleting inventory: ${err}`);
  }
}
