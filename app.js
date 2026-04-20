const express = require("express");
const path = require("node:path");
const categoriesRoutes = require('./routes/categoriesRoutes');
const itemsRoutes = require('./routes/itemsRoutes');


const app = express();
const PORT = process.env.PORT || 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.render('index', { title: 'Items page' });
});

app.use('/categories', categoriesRoutes);
// app.use('/items', itemsRoutes);



app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    console.log(`Server running at http://localhost:${PORT}/`);
})