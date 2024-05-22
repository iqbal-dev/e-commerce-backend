import { NotFoundError } from '../../errors/NotFoundError';
import { TProduct } from './product.interface';
import Product from './product.model';
type TProductQuery = {
  $or?: Array<{
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    category?: { $regex: string; $options: string };
  }>;
};
const create = async (product: TProduct) => {
  const result = await Product.create(product);

  return result;
};
const update = async (product: Partial<TProduct>, productId: string) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: product },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }

  return result;
};
const remove = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);

  if (!result) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }

  return result;
};
const products = async (searchTerm: string): Promise<TProduct[]> => {
  const query: TProductQuery = {};

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }
  const result = await Product.find(query);
  return result;
};
const product = async (productId: string): Promise<TProduct> => {
  const result = await Product.findById(productId);
  if (!result) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
  return result;
};

export const ProductServices = {
  create,
  update,
  products,
  product,
  remove,
};
