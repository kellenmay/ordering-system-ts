import { connection } from '../database';
export async function getCustomers() {
    const [row] = await connection.query(`SELECT * FROM customer`);
    return row ?? null;
}
export async function getCustomer(id) {
    const [[row]] = await connection.query(`SELECT * FROM customer WHERE customer.id = ${id};`);
    return row ?? null;
}
export async function getInventories() {
    const [row] = await connection.query(`SELECT * FROM inventory `);
    return row ?? null;
}
export async function getInventory(id) {
    const [[row]] = await connection.query(`SELECT * FROM inventory WHERE inventory.id = ${id}`);
    return row ?? null;
}
export async function getInvoices() {
    const [rows] = await connection.query(`SELECT * FROM invoice`);
    return rows ?? null;
}
export async function getInvoice(id) {
    const [[row]] = await connection.query(`SELECT * FROM invoice WHERE invoice.id = ${id}`);
    return row ?? null;
}
