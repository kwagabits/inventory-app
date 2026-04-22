const db = require("../database/queries");
const { body, validationResult, matchedData, query } = require("express-validator");

const validateMessage = [
  body("name")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 20 }).withMessage('Name must be between 1 and 20 charaters')  
    .isString(),
  body('description')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Description must be under 50 characters"),  
   body('price') 
    .notEmpty()
    .trim()
    .isInt({min: 0 })
    .withMessage("Price must be an integer"),
   body("quantity")
    .notEmpty()
    .trim()
    .isInt({min: 0 })
    .withMessage("Quantity must be an integer"),
   body("expiration_date")
    .notEmpty()
    .trim()
    .isISO8601()
    .withMessage("Expiration date must be a date YYYY-MM-DD")
]


const get_Items_WIth_Category_Names =  async (req, res) => {
    try {

        const result = await db.getItemsWIthCategoryNames();
        const category = result;
        res.render('inventory', { title: "All Items", items: result, allItems: true});

    } catch (err) {
        return res.status(500).send('Database error');
    }
}


const get_items = async (req, res) => {

    try {

        const id = req.params.id;
        const result = await db.getItems(id);
        res.render('details', { title: "Details", items: result});

    } catch (err) {
        return res.status(500).send('Database error');
    }

}

const get_create_item = async (req, res) => {

    try {

        const result = await db.getAllCategories(); 
        res.render('items/itemsForm', { title: "Items Form", categories: result});

    } catch (err) {
        return res.status(500).send('Database error');
    }

}

const post_create_item =  [
    validateMessage,
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()){
                const categories = await db.getAllCategories();

                try {
                    return res.status(400).render("items/itemsForm", { title: "Create Item", categories: categories, errors: errors.array()});

                } catch(err) {
                    return res.status(500).send('Database error');
                }
            
            } else {
                try{
                    const { name, description, price, quantity, expiration_date } = matchedData(req);
                    const category_id = req.body.category_id;
                    await db.postCreatedItem(name, description, price, quantity, expiration_date, category_id);
                    res.redirect("/items/all");

                } catch(err) {
                    return res.status(500).send('Database error');
                }
  
            }

        }
];

const get_edit_item = async (req, res) => {
    try {
        const { id } = req.params;
        const itemResult = await db.get_single_item(id);
        const categoriesResult = await db.getAllCategories() 
        res.render('items/itemsEdit', { title: "Edit Category", oldInput: null, item: itemResult[0], categories: categoriesResult})

    } catch(err) {
        return res.status(500).send('Database error');
    }
};

const post_updated_item = [
    validateMessage,
        async (req, res) => {
            const errors = validationResult(req);
            const id = req.params.id;

            if (!errors.isEmpty()){
                try{
                    const result = await db.get_single_item(id);
                    const categoriesResult = await db.getAllCategories();
                    return res.status(400).render("items/itemsEdit", { title: "Edit Items", categories: categoriesResult, item: result[0], oldInput: req.body, errors: errors.array()});
                } catch(err) {
                    return res.status(500).send('Database error');
                }
            
            } else {
                try {
                    const { name, description, price, quantity, expiration_date } = matchedData(req);
                    const { id } = req.params;
                    const category_id = req.body.category;
                    await db.updateItems(name, description, price, quantity, expiration_date, category_id, id);
                    const result = await db.getItems(id);
                    res.render("inventory", { title: "Inventory Page", items: result, allItems: false });
                } catch(err) {
                    return res.status(500).send('Database error');

                }
        }
    }
];

const post_delete_item = async (req, res) => {

    try {
        const { id } = req.params;
        await db.deleteItem(id);
        res.redirect("/items/all")
    } catch(err) {
        return res.status(500).send('Database error');
    }    
}


module.exports = {
    get_Items_WIth_Category_Names,
    get_items,
    get_create_item,
    post_create_item,
    get_edit_item,
    post_updated_item,
    post_delete_item
}