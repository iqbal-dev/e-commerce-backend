import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.route('/').get(OrderController.orders).post(OrderController.create);
router.route('/:orderId').get(OrderController.order);
const orderRoute = router;

export default orderRoute;
