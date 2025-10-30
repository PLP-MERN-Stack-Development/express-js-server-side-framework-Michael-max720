const express = require('express');
const router = express.Router();
const { NotFoundError, ValidationError } = require('../error/customerrors');
let products = require('../data/products');


router.get('/', (req, res, next) => {
  try {
    res.json(products);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});


router.post('/', (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !price) throw new ValidationError('Name and price are required');

    const newProduct = {
      id: products.length + 1,
      name,
      description: description || '',
      price,
      category: category || 'Uncategorized',
      inStock: inStock ?? true,
    };
    products.push(newProduct);
    res.status(201).json({ message: 'Product successfully created', product: newProduct });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
