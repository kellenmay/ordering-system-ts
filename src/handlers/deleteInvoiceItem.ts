import { connection } from '../database';
import { InvoiceRepo } from '../repos';
import type { DeleteInvoiceItemArgs } from '../utils';

export async function deleteInvoiceItem(
  args: DeleteInvoiceItemArgs,
): Promise<Boolean> {
  try {
    await connection.beginTransaction();

    const repo = new InvoiceRepo(connection);
    const invoice = await repo.get(args.invoiceId);

    invoice.deleteInvoiceItem(args.lineNumber);

    await repo.save(invoice);

    await connection.commit();

    await connection.release();
    return true;
  } catch (err: unknown) {
    await connection.rollback();
    await connection.destroy();

    throw Error(`Error deleting invoice item: ${err}`);
  }
}
