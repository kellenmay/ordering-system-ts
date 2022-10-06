import { connection } from '../database';
export async function getCustomer(id) {
    const [[row]] = await connection.query(`SELECT * FROM customer WHERE customer.id = ${id};`);
    return row ?? null;
}
export async function getInventory(id) {
    const [[row]] = await connection.query(`SELECT * FROM inventory WHERE inventory.id = ${id}`);
    return row ?? null;
}
export async function getInvoice(id) {
    const [[row]] = await connection.query(`SELECT * FROM invoice WHERE invoice.id = ${id}`);
    return row ?? null;
}
