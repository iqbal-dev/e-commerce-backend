import { z } from 'zod';
import { TOrder } from './order.interface';

// Define Zod schema for order data
const OrderSchema = z.object({
  email: z.string().trim().email(),
  productId: z.string(),
  price: z.number().min(0, { message: 'Price cannot be negative' }),
  quantity: z.number().min(1, { message: 'Quantity cannot be less than 1' }),
});

// Validate function for order data
export const validateOrder = (data: TOrder) => {
  const validatedData = OrderSchema.parse(data);
  return validatedData;
};
