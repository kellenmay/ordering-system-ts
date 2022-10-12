import { connection } from '../database';
import { InvoiceRepo } from '../repos';

export async function deleteInvoice(id: string): Promise<void> {
  try {
    await connection.beginTransaction();
    const repo = new InvoiceRepo(connection);
    await repo.deleteInvoice(id);
    await connection.commit();
    await connection.release();
  } catch (err) {
    await connection.rollback();
    await connection.destroy();
    throw Error(`Error deleting invoice: ${err}`);
  }
}
