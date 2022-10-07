import { getCustomer, getCustomers, getInventories, getInventory, getInvoices, } from '../utils';
import { createInvoiceItem, deleteInvoiceItem, updateInvoice, updateInvoiceItem, } from '../handlers';
import { InvoiceRepo } from '../repos';
import { Invoice } from './types';
const resolvers = {
    Query: {
        customers: async () => {
            try {
                const customers = await getCustomers();
                console.log(customers);
                return customers;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        },
        customer: async (obj, args) => {
            try {
                const customer = await getCustomer(args.id);
                console.log({ customer });
                return customer;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        },
        inventories: async () => {
            try {
                const inventories = await getInventories();
                return inventories;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        },
        inventory: async (obj, args) => {
            try {
                const inventory = await getInventory(args.id);
                console.log({ inventory });
                return inventory;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        },
        invoices: async () => {
            try {
                const invoices = await getInvoices();
                console.log(invoices);
                return invoices;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        },
        invoice: async (obj, args, context) => {
            try {
                const repo = new InvoiceRepo(context.connection);
                const invoice = await repo.get(args.id);
                const state = invoice.getState();
                return new Invoice(state);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        },
    },
    Mutation: {
        createInvoiceItem: async (obj, { args }) => {
            try {
                const invoiceItem = await createInvoiceItem(args);
                return {
                    invoiceItem: {
                        id: `"Invoice Number" + ${invoiceItem.invoiceNumber}|"Line number" + ${invoiceItem.lineNumber}`,
                        ...invoiceItem,
                    },
                    success: true,
                };
            }
            catch (err) {
                console.error(err);
                return {
                    invoiceItem: null,
                    success: false,
                };
            }
        },
        updateInvoiceItem: async (obj, { args }) => {
            try {
                const invoiceItem = await updateInvoiceItem(args);
                return {
                    invoiceItem: {
                        id: `"Invoice Number" + ${invoiceItem.invoiceNumber}|"Line number" + ${invoiceItem.lineNumber}`,
                        ...invoiceItem,
                    },
                    success: true,
                };
            }
            catch (err) {
                console.error(err);
                return {
                    invoiceItem: null,
                    success: false,
                };
            }
        },
        deleteInvoiceItem: async (obj, args) => {
            try {
                updateInvoiceItem;
                await deleteInvoiceItem(args);
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        },
        updateInvoice: async (obj, { args }) => {
            try {
                const invoice = await updateInvoice(args);
                return {
                    invoice: new Invoice(invoice),
                    success: true,
                };
            }
            catch (err) {
                console.error(err);
                return {
                    invoice: null,
                    success: false,
                };
            }
        },
    },
};
export { resolvers };
