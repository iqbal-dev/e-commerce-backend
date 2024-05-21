import express from 'express';

const router = express.Router();

router.route('/').get((_req, res) => {
  res.json({
    success: true,
    message: 'Hello world',
  });
});

const productRoute = router;

export default productRoute;
