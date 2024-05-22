import { NextFunction, Request, Response } from 'express';
import { generateSKU } from '../../utils/generateSkus';
import { ProductServices } from './product.services';
import validateProduct from './product.validation';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product } = req.body;
    const validateData = validateProduct(product);
    const sku = generateSKU(10);
    const productData = await ProductServices.createProduct({
      sku,
      ...validateData,
    });
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: productData,
    });
  } catch (error) {
    next(error);
  }
};
const products = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.searchTerm as string | '';
    const productData = await ProductServices.findAllProduct(searchTerm);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: productData,
    });
  } catch (error) {
    next(error);
  }
};
const product = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const productData = await ProductServices.findOnProductById(productId);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: productData,
    });
  } catch (error) {
    next(error);
  }
};

export const ProductController = {
  create,
  products,
  product,
};
