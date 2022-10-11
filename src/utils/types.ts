import type { Connection, RowDataPacket } from 'mysql2/promise';

export interface Context {
  connection: Connection;
}
export interface CustomerRow extends RowDataPacket {
  id: number;
  name: string | null;
  address: string | null;
  email: string | null;
  phone_number: string | null;
}

export interface CreateCustomerArgs {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateCustomerArgs {
  id: number;
  name: string | null;
  address: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface DeleteCustomerRow extends RowDataPacket {
  id: number;
  name: string | null;
  address: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface InventoryRow extends RowDataPacket {
  id: number;
  item_number: string | null;
  make: string | null;
  msrp: string | null;
  item_description: string | null;
}

export interface UpdateInventoryArgs {
  id: number;
  itemNumber: string | null;
  make: string | null;
  msrp: number | null;
  itemDescription: string | null;
}

export interface InvoiceRow extends RowDataPacket {
  id: number;
  customer_id: string | null;
  date_of_sale: string | null;
}

export interface UpdateInvoiceArgs {
  id: string;
  customerId?: string | null;
  dateOfSale?: string | null;
}

export interface CreateInvoiceItemArgs {
  invoiceId: string;
  lineNumber: number;
  itemId?: string | null;
  quantity?: number | null;
  price?: number | null;
}

export interface UpdateInvoiceItemArgs {
  invoiceId: string;
  lineNumber: number;
  itemId?: string | null;
  quantity?: number | null;
  price?: number | null;
}

export interface DeleteInvoiceItemArgs {
  invoiceId: string;
  lineNumber: number;
}
