const express = require('express');
const categoriesController = require('../controller/categoriesController');

const router = express.Router();

router.get('/', categoriesController.categories_index);

// router.get('/categories/:id', categoriesController.get_category);

// router.get('/categories/new', categoriesController.get_create_category);

// router.post('/categories/new', categoriesController.post_create_category);

// router.get('/categories/:id/edit', categoriesController.get_edit_category);

// router.post('/categories/:id/update', categoriesController.post_update_categories);

// router.post('/categories/:id/delete', categoriesController.post_delete_categories);

module.exports = router;