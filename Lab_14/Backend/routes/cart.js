const express = require("express");

const shopControllers = require("../controllers/shop");

const router = express.Router();

router.post("/api/add-cart", shopControllers.postAddCart);

router.get("/api/cart", shopControllers.getCart);

router.post("/api/deleteItemCart", shopControllers.postCartDeleteProduct);

router.post("/api/create-order", shopControllers.postCreateOrder);

router.get("/api/orders", shopControllers.getOrders);

exports.routes = router;
