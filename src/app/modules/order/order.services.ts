import { NotFoundError } from '../../errors/NotFoundError';
import { ValidationError } from '../../errors/ValidationError';
import Product from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
type TOrderQuery = {
  email?: { $regex: string; $options: string };
};
const create = async (order: TOrder): Promise<TOrder> => {
  // Fetch the product using its productId
  const product = await Product.findById(order.productId);

  // If the product doesn't exist, throw an error
  if (!product) {
    throw new NotFoundError(`Product ${order.productId} not found`);
  }

  // Check if there is sufficient inventory
  if (product.inventory.quantity < order.quantity) {
    throw new ValidationError(
      {},
      400,
      `Insufficient inventory for product ${product._id}`,
    );
  }
  if (product.inventory.quantity === order.quantity) {
    product.inventory.inStock = false;
  }

  // Decrement the inventory quantity by the order quantity
  product.inventory.quantity -= order.quantity;

  // Save the updated product back to the database
  await product.save();

  // Create the order
  const newOrder = await Order.create(order);

  return newOrder;
};

const order = async (orderId: string): Promise<TOrder> => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new NotFoundError(`Order with ID ${orderId} not found`);
  }
  return order;
};

const orders = async (searchTerm: string): Promise<TOrder[]> => {
  const query: TOrderQuery = {};

  if (searchTerm) {
    query.email = { $regex: searchTerm, $options: 'i' };
  }
  const result = await Order.find(query);
  return result;
};

// Add more find methods as needed

export const OrderServices = { create, order, orders };
