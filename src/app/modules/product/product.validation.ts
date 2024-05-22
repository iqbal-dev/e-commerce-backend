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

// Zod schema for Variant
const updateVariantSchema = z.object({
  type: z.string().trim(),
  value: z.string().trim(),
});

// Zod schema for Inventory
const updateInventorySchema = z.object({
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  inStock: z.boolean().default(true),
});

// Zod schema for Product (for updates)
const updateProductSchema = z
  .object({
    id: z.string(),
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    tags: z.array(z.string()).min(1, 'At least one tag is required').optional(),
    variants: z
      .array(updateVariantSchema)
      .min(1, 'Product variants are required')
      .optional(),
    inventory: updateInventorySchema.optional(),
    category: z.string().trim().optional(),
    weight: z.number().min(0, 'Weight cannot be negative').optional(),
  })
  .partial();

// Example usage of the Zod schemas for update
const validateUpdateProduct = (product: Partial<TProduct>) => {
  return updateProductSchema.parse(product);
};

// Example usage of the Zod schemas
const validateProduct = (product: TProduct) => {
  return productSchema.parse(product);
};

const productValidation = {
  validateProduct,
  validateUpdateProduct,
};

export default productValidation;
