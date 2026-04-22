const express = require('express');
const categoriesController = require('../controller/categoriesController');

const router = express.Router();

router.get('/', categoriesController.categories_index);

router.get('/new', categoriesController.get_create_category);

router.post('/new', categoriesController.post_create_category);

router.get('/:id', categoriesController.get_Category_Items);

router.get('/:id/edit', categoriesController.get_edit_category);

router.post('/:id/update', categoriesController.post_update_categories);

router.post('/:id/delete', categoriesController.post_delete_categories);

module.exports = router;