require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { readAll, read, create, update, remove } = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/src", express.static(path.join(__dirname, "/src")));


app.get('/', async (req, res) => {
    let data = await readAll()
    if(data === null){
        data = []
    }
    res.render('index', { products: data });
});

app.post('/add-product', async (req, res) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});