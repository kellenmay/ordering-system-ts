import { connection } from '../database';
import { CustomerRepo } from '../repos';
export async function updateCustomer(args) {
    try {
        await connection.beginTransaction();
        const repo = new CustomerRepo(connection);
        const customer = await repo.get(args.id.toString());
        customer.updateCustomer({
            name: args.name,
            email: args.email,
            address: args.address,
            phoneNumber: args.phoneNumber,
        });
        await repo.save(customer);
        await connection.commit();
        const updatedCustomer = customer.getState();
        if (!updatedCustomer) {
            throw new Error('No new line updated');
        }
        await connection.release();
        return updatedCustomer;
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error updating customer: ${err}`);
    }
}
