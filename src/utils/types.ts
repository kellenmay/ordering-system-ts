import type { RowDataPacket } from 'mysql2/promise';

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
