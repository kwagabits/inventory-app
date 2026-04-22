const { name } = require('ejs');
const pool = require('./db');




// Categories queries

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function insertCategory(category, description) {
  await pool.query("INSERT INTO categories (category, description) VALUES ($1, $2)", [category, description]);    
}

async function getCategory(id) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    return rows;
}

async function updateCategory(category, description, id) {
    await pool.query("UPDATE categories SET category = $1, description = $2 WHERE id = $3", [category, description, id]);
}

async function deleteCategory(id) {
    await pool.query("DELETE FROM categories WHERE id = $1", [id])
}



// Items queries


async function getItems(id) {
    const { rows } = await pool.query("SELECT items.*, categories.category FROM items JOIN categories ON items.category_id = categories.id WHERE items.id = $1", [id]);
    return rows;
}

async function getCategoryItems(id) {
    const { rows } = await pool.query("SELECT items.*, categories.category FROM items JOIN categories ON items.category_id = categories.id WHERE category_id = $1",[id]);
    return rows;
}

async function getItemsWIthCategoryNames() {
    const { rows } = await pool.query("SELECT items.*, categories.category FROM items JOIN categories ON items.category_id = categories.id")
    return rows;
}

async function postCreatedItem(name, description, price, quantity, expiration_date, category_id) {
    await pool.query("INSERT INTO items (name, description, price, quantity, expiration_date, category_id) VALUES ($1, $2, $3, $4, $5, $6)", [name, description, price, quantity, expiration_date, category_id])
    
}

async function get_single_item(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return rows;  
} 

async function updateItems(name, description, price, quantity, expiration_date, category_id, id) {
    await pool.query("UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, expiration_date = $5, category_id = $6 WHERE id = $7", [name, description, price, quantity, expiration_date, category_id, id]);
}

async function deleteItem(id) {
    await pool.query("DELETE FROM items WHERE id = $1", [id])
}

module.exports = {

    //categories
    getAllCategories,
    getCategoryItems,
    insertCategory,
    getCategory,
    updateCategory,
    deleteCategory,


    // items
    getItems,
    getItemsWIthCategoryNames,
    postCreatedItem,
    get_single_item,
    updateItems,
    deleteItem
    
}