import { connection } from '../database';
import { InvoiceRepo } from '../repos';
export async function createInvoice(args) {
    try {
        await connection.beginTransaction();
        const repo = new InvoiceRepo(connection);
        const invoice = await repo.getInvoiceId();
        const invoiceId = await repo.get(invoice);
        invoiceId.createInvoice({
            customerId: args.customerId ?? null,
            dateOfSale: args.dateOfSale ?? null,
        });
        await repo.save(invoiceId);
        await connection.commit();
        const createdInvoice = invoiceId.getState();
        if (!createdInvoice) {
            throw new Error('No new invoice created');
        }
        await connection.release();
        return createdInvoice;
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error creating invoice: ${err}`);
    }
}
