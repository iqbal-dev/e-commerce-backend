import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();
router.route('/:productId').get(ProductController.product);
router
  .route('/')
  .get(ProductController.products)
  .post(ProductController.create);

const productRoute = router;

export default productRoute;
