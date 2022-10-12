import { createCustomer, createInventory, createInvoice, createInvoiceItem, deleteCustomer, deleteInventory, deleteInvoice, deleteInvoiceItem, updateCustomer, updateInventory, updateInvoice, updateInvoiceItem, } from '../handlers';
import { Customer, Inventory, Invoice, InvoiceItem } from './types';
const resolvers = {
    Query: {
        customers: async (obj, args, context) => {
            try {
                const [rows] = await context.connection.query(`SELECT * FROM customer;`);
                return rows.map((row) => new Customer({
                    id: row.id.toString(),
                    name: row.name,
                    address: row.address,
                    email: row.email,
                    phoneNumber: row.phone_number,
                }));
            }
            catch (error) {
                console.error(error);
                return [];
            }
        },
        customer: async (obj, args, context) => {
            try {
                const [[row]] = await context.connection.query(`SELECT * FROM customer WHERE id = ?;`, [args.id]);
                if (row) {
                    return new Customer({
                        id: row.id.toString(),
                        name: row.name,
                        address: row.address,
                        email: row.email,
                        phoneNumber: row.phone_number,
                    });
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        },
        inventories: async (obj, args, context) => {
            try {
                const [rows] = await context.connection.query(`SELECT * FROM inventory;`);
                return rows.map((row) => new Inventory({
                    id: row.id.toString(),
                    itemNumber: row.item_number,
                    make: row.make,
                    msrp: row.msrp,
                    itemDescription: row.item_description,
                }));
            }
            catch (error) {
                console.error(error);
                return [];
            }
        },
        inventory: async (obj, args, context) => {
            try {
                const [[row]] = await context.connection.query(`SELECT * FROM inventory WHERE id = ?;`, [args.id]);
                if (row) {
                    return new Inventory({
                        id: row.id.toString(),
                        itemNumber: row.item_number,
                        make: row.make,
                        msrp: row.msrp,
                        itemDescription: row.item_description,
                    });
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        },
        invoices: async (obj, args, context) => {
            try {
                const [rows] = await context.connection.query(`SELECT * FROM invoice;`);
                return rows.map((row) => new Invoice({
                    id: row.id.toString(),
                    customerId: row.customer_id?.toString() ?? null,
                    dateOfSale: row.date_of_sale,
                }));
            }
            catch (error) {
                console.error(error);
                return [];
            }
        },
        invoice: async (obj, args, context) => {
            try {
                const [[row]] = await context.connection.query(`SELECT * FROM invoice WHERE id = ?;`, [args.id]);
                if (row) {
                    return new Invoice({
                        id: row.id.toString(),
                        customerId: row.customer_id?.toString() ?? null,
                        dateOfSale: row.date_of_sale,
                    });
                }
                return null;
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
        deleteInventory: async (obj, args) => {
            try {
                await deleteInventory(args.id);
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        },
        createInventory: async (obj, { args }) => {
            try {
                const inventory = await createInventory(args);
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
        createInvoice: async (obj, { args }) => {
            try {
                const invoice = await createInvoice(args);
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
        deleteInvoice: async (obj, args) => {
            try {
                await deleteInvoice(args.id);
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        },
    },
};
export { resolvers };
