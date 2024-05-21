import { z } from 'zod';
import { TProduct } from './product.interface';

// Zod schema for Variant
const variantSchema = z.object({
  type: z.string().trim(),
  value: z.string().trim(),
});

// Zod schema for Inventory
const inventorySchema = z.object({
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  inStock: z.boolean().default(true),
});

// Zod schema for Product
const productSchema = z.object({
  sku: z.string().trim(),
  name: z.string().trim(),
  description: z.string().trim(),
  price: z.number().min(0, 'Price cannot be negative'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  variants: z
    .array(variantSchema.required())
    .min(1, 'Product variants are required'),
  inventory: inventorySchema.required(),
  category: z.string().trim(),
  weight: z.number().min(0, 'Weight cannot be negative'),
});

// Example usage of the Zod schemas
const validateProduct = (product: TProduct) => {
  return productSchema.parse(product);
};

export default validateProduct;
