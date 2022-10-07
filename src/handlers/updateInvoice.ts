import { connection } from '../database';
import { InvoiceDTO, InvoiceRepo } from '../repos';
import type { UpdateInvoiceArgs } from '../utils';

export async function updateInvoice(
  args: UpdateInvoiceArgs,
): Promise<InvoiceDTO> {
  try {
    await connection.beginTransaction();

    const repo = new InvoiceRepo(connection);
    const invoice = await repo.get(args.id);

    invoice.updateInvoice({
      customerId: args.customerId,
      dateOfSale: args.dateOfSale,
    });

    await repo.save(invoice);

    await connection.commit();

    const updatedInvoice = invoice.getState();

    await connection.release();

    return updatedInvoice;
  } catch (err: unknown) {
    await connection.rollback();
    await connection.destroy();

    throw Error(`Error updating invoice: ${err}`);
  }
}
