import { connection } from '../database';
import { InventoryRepo } from '../repos';
export async function updateInventory(args) {
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
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error updating inventory: ${err}`);
    }
}
