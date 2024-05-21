import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router
  .route('/')
  .get((_req, res) => {
    res.json({
      success: true,
      message: 'Hello world',
    });
  })
  .post(ProductController.create);

const productRoute = router;

export default productRoute;
