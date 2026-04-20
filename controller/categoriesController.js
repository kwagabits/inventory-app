

const categories_index = (req, res) => {
    res.render('categories', { title: 'Categories Page'});
}



module.exports = {
    categories_index,
    // get_category,
    // get_create_category,
    // post_create_category,
    // get_edit_category,
    // post_update_categories,
    // post_delete_categories
}

