import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.services';
import { validateOrder } from './order.validation';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order } = req.body;
    const validateData = validateOrder(order);
    const orderData = await OrderServices.create(validateData);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order created successfully',
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};
const orders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.searchTerm as string | '';
    const orderData = await OrderServices.orders(searchTerm);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order fetched successfully',
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};
const order = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const orderData = await OrderServices.order(orderId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order fetched successfully',
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  create,
  orders,
  order,
};
