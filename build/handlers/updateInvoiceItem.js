import { connection } from '../database';
import { InvoiceRepo } from '../repos';
export async function updateInvoiceItem(args) {
    try {
        await connection.beginTransaction();
        const repo = new InvoiceRepo(connection);
        const invoice = await repo.get(args.invoiceId);
        invoice.updateInvoiceItem({
            lineNumber: args.lineNumber,
            itemId: args.itemId ?? null,
            quantity: args.quantity ?? null,
            price: args.price ?? null,
        });
        await repo.save(invoice);
        await connection.commit();
        const updatedInvoice = invoice.getState();
        const newLine = updatedInvoice.invoiceItems.find((item) => item.lineNumber === args.lineNumber.toString());
        if (!newLine) {
            throw new Error('No new line updated');
        }
        await connection.release();
        return newLine;
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error updating invoice item: ${err}`);
    }
}
