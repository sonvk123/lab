const express = require("express");

const router = express.Router();

const products = require("../controllers/products");

const shop = require("../controllers/shop");

router.get("/products", products.getProducts);

router.get("/products/:productId", products.getProductDetail);

router.get("/shop", shop.getShop);


module.exports = router;
