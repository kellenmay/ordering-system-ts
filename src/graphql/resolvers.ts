import {
  createCustomer,
  createInventory,
  createInvoice,
  createInvoiceItem,
  deleteCustomer,
  deleteInventory,
  deleteInvoice,
  deleteInvoiceItem,
  updateCustomer,
  updateInventory,
  updateInvoice,
  updateInvoiceItem,
} from '../handlers';
import type { CustomerRow, InventoryRow, InvoiceRow } from '../repos';
import type {
  Context,
  CreateCustomerArgs,
  CreateInventoryArgs,
  CreateInvoiceArgs,
  CreateInvoiceItemArgs,
  DeleteInvoiceItemArgs,
  UpdateCustomerArgs,
  UpdateInventoryArgs,
  UpdateInvoiceArgs,
  UpdateInvoiceItemArgs,
} from '../utils';
import { Customer, Inventory, Invoice, InvoiceItem } from './types';

const resolvers = {
  Query: {
    customers: async (
      obj: unknown,
      args: unknown,
      context: Context,
    ): Promise<Customer[]> => {
      try {
        const [rows] = await context.connection.query<CustomerRow[]>(
          `SELECT * FROM customer;`,
        );

        return rows.map(
          (row) =>
            new Customer({
              id: row.id.toString(),
              name: row.name,
              address: row.address,
              email: row.email,
              phoneNumber: row.phone_number,
            }),
        );
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    customer: async (
      obj: any,
      args: { id: string },
      context: Context,
    ): Promise<Customer | null> => {
      try {
        const [[row]] = await context.connection.query<CustomerRow[]>(
          `SELECT * FROM customer WHERE id = ?;`,
          [args.id],
        );

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
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    inventories: async (
      obj: any,
      args: { id: string },
      context: Context,
    ): Promise<Inventory[]> => {
      try {
        const [rows] = await context.connection.query<InventoryRow[]>(
          `SELECT * FROM inventory;`,
        );

        return rows.map(
          (row) =>
            new Inventory({
              id: row.id.toString(),
              itemNumber: row.item_number,
              make: row.make,
              msrp: row.msrp,
              itemDescription: row.item_description,
            }),
        );
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    inventory: async (
      obj: any,
      args: { id: string },
      context: Context,
    ): Promise<Inventory | null> => {
      try {
        const [[row]] = await context.connection.query<InventoryRow[]>(
          `SELECT * FROM inventory WHERE id = ?;`,
          [args.id],
        );

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
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    invoices: async (
      obj: any,
      args: { id: string },
      context: Context,
    ): Promise<Invoice[]> => {
      try {
        const [rows] = await context.connection.query<InvoiceRow[]>(
          `SELECT * FROM invoice;`,
        );

        return rows.map(
          (row) =>
            new Invoice({
              id: row.id.toString(),
              customerId: row.customer_id?.toString() ?? null,
              dateOfSale: row.date_of_sale,
            }),
        );
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    invoice: async (
      obj: any,
      args: { id: string },
      context: Context,
    ): Promise<Invoice | null> => {
      try {
        const [[row]] = await context.connection.query<InvoiceRow[]>(
          `SELECT * FROM invoice WHERE id = ?;`,
          [args.id],
        );

        if (row) {
          return new Invoice({
            id: row.id.toString(),
            customerId: row.customer_id?.toString() ?? null,
            dateOfSale: row.date_of_sale,
          });
        }
        return null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  Mutation: {
    createCustomer: async (
      obj: any,
      { args }: { args: CreateCustomerArgs },
    ): Promise<CustomerReturn> => {
      try {
        const customer = await createCustomer(args);

        return {
          customer: new Customer(customer),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          customer: null,
          success: false,
        };
      }
    },
    deleteCustomer: async (
      obj: any,
      args: { id: string },
    ): Promise<boolean> => {
      try {
        await deleteCustomer(args.id);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    createInvoiceItem: async (
      obj: any,
      { args }: { args: CreateInvoiceItemArgs },
    ): Promise<InvoiceItemReturn> => {
      try {
        const invoiceItem = await createInvoiceItem(args);

        return {
          invoiceItem: new InvoiceItem(invoiceItem),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          invoiceItem: null,
          success: false,
        };
      }
    },
    updateInvoiceItem: async (
      obj: any,
      { args }: { args: UpdateInvoiceItemArgs },
    ): Promise<InvoiceItemReturn> => {
      try {
        const invoiceItem = await updateInvoiceItem(args);
        return {
          invoiceItem: new InvoiceItem(invoiceItem),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          invoiceItem: null,
          success: false,
        };
      }
    },
    updateCustomer: async (
      obj: any,
      { args }: { args: UpdateCustomerArgs },
    ): Promise<CustomerReturn> => {
      try {
        const customer = await updateCustomer(args);
        return {
          customer: new Customer(customer),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          customer: null,
          success: false,
        };
      }
    },
    updateInventory: async (
      obj: any,
      { args }: { args: UpdateInventoryArgs },
    ): Promise<InventoryReturn> => {
      try {
        const inventory = await updateInventory(args);
        return {
          inventory: new Inventory(inventory),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          inventory: null,
          success: false,
        };
      }
    },
    deleteInventory: async (
      obj: any,
      args: { id: string },
    ): Promise<boolean> => {
      try {
        await deleteInventory(args.id);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    createInventory: async (
      obj: any,
      { args }: { args: CreateInventoryArgs },
    ): Promise<InventoryReturn> => {
      try {
        const inventory = await createInventory(args);
        return {
          inventory: new Inventory(inventory),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          inventory: null,
          success: false,
        };
      }
    },
    deleteInvoiceItem: async (
      obj: any,
      args: DeleteInvoiceItemArgs,
    ): Promise<boolean> => {
      try {
        updateInvoiceItem;
        await deleteInvoiceItem(args);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    updateInvoice: async (
      obj: any,
      { args }: { args: UpdateInvoiceArgs },
    ): Promise<InvoiceReturn> => {
      try {
        const invoice = await updateInvoice(args);

        return {
          invoice: new Invoice(invoice),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          invoice: null,
          success: false,
        };
      }
    },
    createInvoice: async (
      obj: any,
      { args }: { args: CreateInvoiceArgs },
    ): Promise<InvoiceReturn> => {
      try {
        const invoice = await createInvoice(args);

        return {
          invoice: new Invoice(invoice),
          success: true,
        };
      } catch (err) {
        console.error(err);
        return {
          invoice: null,
          success: false,
        };
      }
    },
    deleteInvoice: async (obj: any, args: { id: string }): Promise<boolean> => {
      try {
        await deleteInvoice(args.id);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

export { resolvers };

interface InvoiceReturn {
  invoice: Invoice | null;
  success: boolean;
}

interface InvoiceItemReturn {
  invoiceItem: InvoiceItem | null;
  success: boolean;
}

interface CustomerReturn {
  customer: Customer | null;
  success: boolean;
}

interface InventoryReturn {
  inventory: Inventory | null;
  success: boolean;
}
