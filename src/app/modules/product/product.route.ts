import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.json({
      success: true,
      message: 'Hello world',
    })
  })
  .post(ProductController.create)
  .put((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {})

const productRoute = router

export default productRoute