const db = require("../database/queries");
const { body, validationResult, matchedData, query } = require("express-validator");


const validateMessage = [
  body("category").trim()
    .isLength({ min: 1, max: 20 }).withMessage('Name must be between 1 and 30 charaters')  
    .isAlpha().withMessage('Name must only contain letters'),
  body('description')
    .isString()
    .trim()
    .isLength({ max: 30 }).withMessage("Description must be under 50 characters")  
]


const categories_index = async (req, res) => {

    try {
        const result = await db.getAllCategories();
        res.render('categories/categories', { title: 'Categories Page', categories: result});
    } catch(err){
        return res.status(500).send('Database error');
    }
  
}

const get_Category_Items = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.getCategoryItems(id);
        res.render("inventory", { title: "Sorted by category", items: result, allItems: false })
    } catch(err) {
        return res.status(500).send('Database error');
    }

}


const get_create_category = (req, res) => {
    try {
        res.render('categories/categoriesForm', { title: "Create Category"})
    } catch(err){
        return res.status(500).send('Database error');
    }
}

const post_create_category = [
    validateMessage,
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()){

                try {
                    return res.status(400).render("categories/categoriesForm", { title: "Create Category", errors: errors.array()});

                } catch(err) {
                    return res.status(500).send('Database error');
                }
            
            } else {
                try{

                    const { category, description } = matchedData(req);
                    await db.insertCategory(category, description);
                    const result = await db.getAllCategories();
                    res.render("categories/categories", { title: "Categories Page", categories: result });

                } catch(err) {
                    return res.status(500).send('Database error');
                }
  
            }

        }
];

const get_edit_category = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await db.getCategory(id);
        res.render('categories/categoriesEdit', { title: "Edit Category", oldInput: null, category: result[0] })
    } catch(err) {
        return res.status(500).send('Database error');
    }
}


const post_update_categories = [
    validateMessage,
        async (req, res) => {
            const errors = validationResult(req);
            const categoryId = req.params.id;

            if (!errors.isEmpty()){
                try{
                    const result = await db.getCategory(categoryId);
                    return res.status(400).render("categories/categoriesEdit", { title: "Edit Category", category: result[0], oldInput: req.body, errors: errors.array()});

                } catch(err) {
                    return res.status(500).send('Database error');
                }
            
            } else {
                try {
                    const { category, description } = matchedData(req);
                    const { id } = req.params;
                    await db.updateCategory(category, description, id);
                    const result = await db.getAllCategories(id);
                    res.render("categories/categories", { title: "Categories Page", categories: result });
                } catch(err) {
                    return res.status(500).send('Database error');

                }
        }
    }
];

const post_delete_categories = async (req, res) => {
    try {
        const { id } = req.params;
        await db.deleteCategory(id)
        res.redirect("/categories");
    } catch (err) {
        return res.status(500).send('Database error');
    }
}



module.exports = {
    categories_index,
    get_Category_Items,
    get_create_category,
    post_create_category,
    get_edit_category,
    post_update_categories,
    post_delete_categories
}

