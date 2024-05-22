import { NextFunction, Request, Response } from 'express';
import { generateSKU } from '../../utils/generateSkus';
import { ProductServices } from './product.services';
import validateProduct from './product.validation';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestBody = req.body;
    const validateData = validateProduct.validateProduct(requestBody);
    const sku = generateSKU(10);
    const productData = await ProductServices.create({
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
    const productData = await ProductServices.products(searchTerm);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product fetched successfully',
      data: productData,
    });
  } catch (error) {
    next(error);
  }
};
const product = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const productData = await ProductServices.product(productId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product fetched successfully',
      data: productData,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestData = req.body;
    const productId: string = req.params.productId;
    const validateData = validateProduct.validateUpdateProduct(requestData);
    const productData = await ProductServices.update(validateData, productId);
    res.status(202).json({
      success: true,
      statusCode: 202,
      message: 'Product updated successfully',
      data: productData,
    });
  } catch (error) {
    next(error);
  }
};
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId: string = req.params.productId;
    await ProductServices.remove(productId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
export const ProductController = {
  create,
  update,
  products,
  product,
  remove,
};
