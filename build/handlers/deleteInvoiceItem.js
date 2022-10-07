import { connection } from '../database';
import { InvoiceRepo } from '../repos';
export async function deleteInvoiceItem(args) {
    try {
        await connection.beginTransaction();
        const repo = new InvoiceRepo(connection);
        const invoice = await repo.get(args.invoiceId);
        invoice.deleteInvoiceItem(args.lineNumber);
        await repo.save(invoice);
        await connection.commit();
        await connection.release();
        return true;
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error creating invoice item: ${err}`);
    }
}
