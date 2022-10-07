import {
  CustomerRow,
  getCustomer,
  getCustomers,
  getInventories,
  getInventory,
  getInvoices,
  InventoryRow,
  InvoiceRow,
} from '../utils';

import {
  createInvoiceItem,
  deleteInvoiceItem,
  updateInvoice,
} from '../handlers';
import { InvoiceRepo } from '../repos';
import type {
  Context,
  CreateInvoiceItemArgs,
  DeleteInvoiceItemArgs,
  UpdateInvoiceArgs,
} from '../utils';
import { Invoice, InvoiceItem } from './types';

const resolvers = {
  Query: {
    customers: async (): Promise<CustomerRow[]> => {
      try {
        const customers = await getCustomers();
        console.log(customers);
        return customers;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    customer: async (
      obj: any,
      args: { id: string },
    ): Promise<CustomerRow | null> => {
      try {
        const customer = await getCustomer(args.id);
        console.log({ customer });
        return customer;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    inventories: async (): Promise<InventoryRow[]> => {
      try {
        const inventories = await getInventories();
        return inventories;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    inventory: async (
      obj: any,
      args: { id: string },
    ): Promise<InventoryRow | null> => {
      try {
        const inventory = await getInventory(args.id);
        console.log({ inventory });
        return inventory;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    invoices: async (): Promise<InvoiceRow[]> => {
      try {
        const invoices = await getInvoices();
        console.log(invoices);
        return invoices;
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
        const repo = new InvoiceRepo(context.connection);
        const invoice = await repo.get(args.id);
        const state = invoice.getState();
        return new Invoice(state);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  Mutation: {
    createInvoiceItem: async (
      obj: any,
      { args }: { args: CreateInvoiceItemArgs },
    ): Promise<InvoiceItemReturn> => {
      try {
        const invoiceItem = await createInvoiceItem(args);

        return {
          invoiceItem: {
            id: `"Invoice Number" + ${invoiceItem.invoiceNumber}|"Line number" + ${invoiceItem.lineNumber}`,
            ...invoiceItem,
          },
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
    deleteInvoiceItem: async (
      obj: any,
      args: DeleteInvoiceItemArgs,
    ): Promise<boolean> => {
      try {
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
