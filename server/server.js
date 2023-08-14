//// Students : Raz Butbul :319083747, Lion Miakshin :315992735
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');
const PORT = 8000;
app.use(express.json());
app.use(cors());

let cartItems = [];
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
// Function to read products from the database file
const getProducts = (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch' });
            return;
        }
        const file = JSON.parse(data.toString());
        res.json(file.products);
    });
};
// Function to add items to the cart
const addToCart = (req, res) => {
    const product = req.body;
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cartItems.push(product);
    }
    res.json({
        data: cartItems
    });
};
// Function to get items from the cart
const getCartItems = (req, res) => {
    res.json({
        data: cartItems
    });
};
app.get('/products', cors(corsOptions), getProducts);
app.post('/Cart', cors(corsOptions), addToCart);
app.get('/Cart', cors(corsOptions), getCartItems);


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}..`)
});
