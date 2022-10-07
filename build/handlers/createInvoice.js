import { connection } from '../database';
import { InvoiceRepo } from '../repos';
export async function createInvoice(args) {
    try {
        await connection.beginTransaction();
        const repo = new InvoiceRepo(connection);
        const invoice = await repo.get(args.invoiceId);
        invoice.createInvoice({});
    }
    finally {
    }
}
