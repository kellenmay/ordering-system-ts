import { connection } from '../database';
import { InvoiceRepo } from '../repos';
export async function updateInvoiceItem(args) {
    try {
        await connection.beginTransaction();
        const repo = new InvoiceRepo(connection);
        const invoice = await repo.get(args.invoiceId);
        invoice.updateInvoiceItem({
            lineNumber: args.lineNumber,
            itemId: args.itemId,
            quantity: args.quantity,
            price: args.price,
        });
        await repo.save(invoice);
        await connection.commit();
        const updatedInvoice = invoice.getState();
        const updatedLine = updatedInvoice.invoiceItems.find((item) => item.lineNumber === args.lineNumber.toString());
        if (!updatedLine) {
            throw new Error('No new line updated');
        }
        await connection.release();
        return updatedLine;
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error updating invoice item: ${err}`);
    }
}
