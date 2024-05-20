import { Schema, model } from 'mongoose'
import { TInventory, TProduct, TVariant } from './product.interface'

// Variant schema
const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
    trim: true,
  },
})

// Inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Stock status is required'],
    default: true,
  },
})

// Product schema
const productSchema = new Schema<TProduct>({
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  tags: {
    type: [String],
    required: [true, 'At least one tag is required'],
    validate: {
      validator: function (v: string[]) {
        return v.length > 0
      },
      message: 'Product should have at least one tag',
    },
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants are required'],
    validate: {
      validator: function (v: TVariant[]) {
        return v.length > 0
      },
      message: 'Product should have at least one variant',
    },
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory details are required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0, 'Weight cannot be negative'],
  },
})

// Indexing for better performance on searches
productSchema.index({ name: 'text', description: 'text', tags: 'text' })
// Product model
const Product = model<TProduct>('Product', productSchema)

export default Product
