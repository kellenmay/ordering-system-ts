import { connection } from '../database';
import type { CustomerRow, InventoryRow, InvoiceRow } from './index';

export async function getCustomers(): Promise<CustomerRow[]> {
  const [row] = await connection.query<CustomerRow[]>(
    `SELECT * FROM customer`,
  );
  return row ?? null;
}

export async function getCustomer(id: string): Promise<CustomerRow | null> {
  const [[row]] = await connection.query<CustomerRow[]>(
    `SELECT * FROM customer WHERE customer.id = ${id};`,
  );
  return row ?? null;
}

export async function getInventories(): Promise<InventoryRow[]> {
  const [row] = await connection.query<InventoryRow[]>(
    `SELECT * FROM inventory `,
  );
  return row ?? null;
}

export async function getInventory(id: string): Promise<InventoryRow | null> {
  const [[row]] = await connection.query<InventoryRow[]>(
    `SELECT * FROM inventory WHERE inventory.id = ${id}`,
  );
  return row ?? null;
}

export async function getInvoices(): Promise<InvoiceRow[]> {
  const [rows] = await connection.query<InvoiceRow[]>(
    `SELECT * FROM invoice`,
  );
  console.log([rows])
  return rows ?? null;
}

export async function getInvoice(id: string): Promise<InvoiceRow | null> {
  const [[row]] = await connection.query<InvoiceRow[]>(
    `SELECT * FROM invoice WHERE invoice.id = ${id}`,
  );
  return row ?? null;
}
