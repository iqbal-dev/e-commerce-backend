import express from 'express'

const router = express.Router()

router
  .route('/')
  .get((req, res) => {})
  .post((req, res) => {})
  .put((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {})

const productRoute = router

export default productRoute
