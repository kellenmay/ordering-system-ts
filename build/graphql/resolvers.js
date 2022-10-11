import { getCustomer, getCustomers, getInventories, getInventory, getInvoices, } from '../utils';
import { createCustomer, createInvoiceItem, deleteCustomer, deleteInvoiceItem, updateCustomer, updateInventory, updateInvoice, updateInvoiceItem, } from '../handlers';
import { InvoiceRepo } from '../repos';
import { Customer, Inventory, Invoice, InvoiceItem } from './types';
const resolvers = {
    Query: {
        customers: async () => {
            try {
                const customers = await getCustomers();
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
        createCustomer: async (obj, { args }) => {
            try {
                const customer = await createCustomer(args);
                return {
                    customer: new Customer(customer),
                    success: true,
                };
            }
            catch (err) {
                console.error(err);
                return {
                    customer: null,
                    success: false,
                };
            }
        },
        deleteCustomer: async (obj, args) => {
            try {
                await deleteCustomer(args.id);
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        },
        createInvoiceItem: async (obj, { args }) => {
            try {
                const invoiceItem = await createInvoiceItem(args);
                return {
                    invoiceItem: new InvoiceItem(invoiceItem),
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
                    invoiceItem: new InvoiceItem(invoiceItem),
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
        updateCustomer: async (obj, { args }) => {
            try {
                const customer = await updateCustomer(args);
                return {
                    customer: new Customer(customer),
                    success: true,
                };
            }
            catch (err) {
                console.error(err);
                return {
                    customer: null,
                    success: false,
                };
            }
        },
        updateInventory: async (obj, { args }) => {
            try {
                const inventory = await updateInventory(args);
                return {
                    inventory: new Inventory(inventory),
                    success: true,
                };
            }
            catch (err) {
                console.error(err);
                return {
                    inventory: null,
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
