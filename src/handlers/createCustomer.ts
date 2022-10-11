import { connection } from '../database';
import { CustomerDTO, CustomerRepo } from '../repos';
import type { CreateCustomerArgs } from '../utils';

export async function createCustomer(
  args: CreateCustomerArgs,
): Promise<CustomerDTO> {
  try {
    await connection.beginTransaction();
    const repo = new CustomerRepo(connection);
    const customerId = await repo.getCustomerId();
    const customer = await repo.get(customerId);
    console.log(customer);
    customer.createCustomer({
      name: args.name,
      email: args.email,
      address: args.address,
      phoneNumber: args.phoneNumber,
    });
    await repo.save(customer);
    await connection.commit();
    const createdCustomer = customer.getState();
    console.log(createdCustomer);

    if (!createdCustomer) {
      throw new Error('No new line created');
    }
    await connection.release();
    return createdCustomer;
  } catch (err) {
    await connection.rollback();
    await connection.destroy();
    throw Error(`Error updating customer item: ${err}`);
  }
}
