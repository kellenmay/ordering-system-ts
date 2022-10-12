import { connection } from '../database';
import { CustomerRepo } from '../repos';
export async function createCustomer(args) {
    try {
        await connection.beginTransaction();
        const repo = new CustomerRepo(connection);
        const customerId = await repo.getCustomerId();
        const customer = await repo.get(customerId);
        customer.createCustomer({
            name: args.name,
            email: args.email,
            address: args.address,
            phoneNumber: args.phoneNumber,
        });
        await repo.save(customer);
        await connection.commit();
        const createdCustomer = customer.getState();
        if (!createdCustomer) {
            throw new Error('No new line created');
        }
        await connection.release();
        return createdCustomer;
    }
    catch (err) {
        await connection.rollback();
        await connection.destroy();
        throw Error(`Error creating customer ${err}`);
    }
}
