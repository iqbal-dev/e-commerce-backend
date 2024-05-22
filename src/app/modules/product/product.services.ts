import { NotFoundError } from '../../errors/NotFoundError';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);

  return result;
};

type TProductQuery = {
  $or?: Array<{
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    category?: { $regex: string; $options: string };
  }>;
};
const findAllProduct = async (searchTerm: string): Promise<TProduct[]> => {
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
const findOnProductById = async (productId: string): Promise<TProduct> => {
  const result = await Product.findById(productId).lean().select('-_id');
  if (!result) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
  return result;
};

export const ProductServices = {
  createProduct,
  findAllProduct,
  findOnProductById,
};
