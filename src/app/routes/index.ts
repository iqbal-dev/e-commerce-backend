import express from 'express';
import orderRoute from '../modules/order/order.route';
import productRoute from '../modules/product/product.route';

const router = express.Router();

router.use('/products', productRoute);
router.use('/orders', orderRoute);

export default router;
