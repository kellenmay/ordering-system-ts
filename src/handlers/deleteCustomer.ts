import { connection } from '../database';
import { CustomerRepo } from '../repos';

export async function deleteCustomer(id: string): Promise<void> {
  try {
    await connection.beginTransaction();
    const repo = new CustomerRepo(connection);
    await repo.deleteCustomer(id);
    await connection.commit();
    await connection.release();
  } catch (err) {
    await connection.rollback();
    await connection.destroy();
    throw Error(`Error updating customer item: ${err}`);
  }
}
