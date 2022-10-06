import {
  CustomerRow,
  getCustomer,
  InventoryRow,
  getInventory,
  InvoiceRow,
  getInvoice,
} from '../utils';

const resolvers = {
  Query: {
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
    invoice: async (
      obj: any,
      args: { id: string },
    ): Promise<InvoiceRow | null> => {
      try {
        const invoice = await getInvoice(args.id);
        console.log({ invoice });
        return invoice;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  Mutation: {},
};

export { resolvers };
