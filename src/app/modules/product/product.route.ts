import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router
  .route('/')
  .get(ProductController.products)
  .post(ProductController.create);
router
  .route('/:productId')
  .get(ProductController.product)
  .put(ProductController.update)
  .delete(ProductController.remove);
const productRoute = router;

export default productRoute;
