import { gql } from 'apollo-server';

const typeDefs = gql`
  type Customer {
    id: ID #done
    name: String #done
    address: String #done
    email: String #done
    phoneNumber: String #done
    invoices: [Invoice!] #done
  }

  type Inventory {
    id: ID #done
    itemNumber: String #done
    make: String #done
    msrp: Float #done
    description: String #done
  }

  type InvoiceItem {
    id: ID #done
    lineNumber: Int
    invoice: Invoice #done
    item: Inventory #done
    quantity: Int #done
    price: Float #done
  }

  type Invoice {
    id: ID #done
    customer: Customer #done
    dateOfSale: String #done
    lines: [InvoiceItem!] #done
  }

  type Query {
    customers: [Customer] #done
    inventories: [Inventory] #done
    invoices: [Invoice] #done
    customer(id: ID!): Customer #done
    invoice(id: ID!): Invoice #done
    inventory(id: ID!): Inventory #done
  }

  input CreateCustomerArgs {
    name: String!
    address: String!
    email: String!
    phoneNumber: String!
  }

  input UpdateCustomerArgs {
    id: ID!
    name: String
    address: String
    email: String
    phoneNumber: String
  }

  type CustomerReturn {
    customer: Customer
    success: Boolean
  }

  input CreateInventoryArgs {
    itemNumber: String
    make: String
    msrp: Float
    description: String
  }

  input UpdateInventoryArgs {
    id: ID!
    itemNumber: String
    make: String
    msrp: Float
    description: String
  }

  type InventoryReturn {
    inventory: Inventory
    success: Boolean
  }

  input CreateInvoiceArgs {
    customerId: ID
    dateOfSale: String
  }

  input UpdateInvoiceArgs {
    id: ID!
    customerId: ID
    dateOfSale: String
  }

  type InvoiceReturn {
    invoice: Invoice
    success: Boolean
  }

  input CreateInvoiceItemArgs {
    invoiceId: ID!
    lineNumber: Int!
    itemId: ID
    quantity: Int
    price: Float
  }

  input UpdateInvoiceItemArgs {
    invoiceId: ID!
    lineNumber: Int!
    itemId: Int
    quantity: Int
    price: Float
  }

  type InvoiceItemReturn {
    invoice: Invoice
    invoiceItem: InvoiceItem
    success: Boolean
  }

  type Mutation {
    createCustomer(args: CreateCustomerArgs!): CustomerReturn
    createInventory(args: CreateInventoryArgs!): InventoryReturn
    createInvoice(args: CreateInvoiceArgs!): InvoiceReturn # this
    createInvoiceItem(args: CreateInvoiceItemArgs!): InvoiceItemReturn
    deleteCustomer(id: ID!): Boolean
    deleteInvoice(id: ID!): Boolean # this
    deleteInventory(id: ID!): Boolean
    deleteInvoiceItem(invoiceId: ID!, lineNumber: Int!): Boolean # this
    updateCustomer(args: UpdateCustomerArgs!): CustomerReturn
    updateInventory(args: UpdateInventoryArgs!): InventoryReturn
    updateInvoice(args: UpdateInvoiceArgs!): InvoiceReturn
    updateInvoiceItem(args: UpdateInvoiceItemArgs!): InvoiceItemReturn # this
  }
`;

export { typeDefs };
