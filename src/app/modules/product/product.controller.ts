import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.services';
import validateProduct from './product.validation';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product } = req.body;
    const validateData = validateProduct(product);

    const productData = await ProductServices.createProduct(validateData);
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
    const productData = await ProductServices.findAllProduct(searchTerm)
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
};
