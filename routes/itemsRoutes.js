const express = require('express');
const itemsController = require('../controller/itemsController');

const router = express.Router();


router.get('/all', itemsController.get_Items_WIth_Category_Names);

router.get('/new', itemsController.get_create_item);

router.post('/new', itemsController.post_create_item);

router.get('/:id', itemsController.get_items);

router.get('/:id/edit', itemsController.get_edit_item);

router.post('/:id/update', itemsController.post_updated_item);

router.post('/:id/delete', itemsController.post_delete_item);


module.exports = router;