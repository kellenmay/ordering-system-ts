import type { Connection, RowDataPacket } from 'mysql2/promise';

export interface CustomerRow extends RowDataPacket {
  id: number;
  name: string | null;
  address: string | null;
  email: string | null;
  phone_number: string | null;
}

export interface InventoryRow extends RowDataPacket {
  id: number;
  item_number: string | null;
  make: string | null;
  msrp: string | null;
  item_description: string | null;
}

export interface InvoiceRow extends RowDataPacket {
  id: number;
  customer_id: string | null;
  date_of_sale: string | null;
}

export interface Context {
  connection: Connection;
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

export interface UpdateInvoiceArgs {
  id: string;
  customerId?: string | null;
  dateOfSale?: string | null;
}

export interface DeleteInvoiceItemArgs {
  invoiceId: string;
  lineNumber: number;
}
