import { TProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);

  return result;
};
const findAllProduct = async (searchTerm: string): Promise<TProduct[]> => {
  const query: { [key: string]: any } = {};

  if (!!searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }
  const result = await Product.find(query);
  return result;
};

export const ProductServices = {
  createProduct,
  findAllProduct,
};
