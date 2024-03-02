const express = require("express");

const router = express.Router();

const adminControllers = require("../controllers/admin");

router.post("/api/admin/add-products", adminControllers.postAddProduct);

router.get("/api/admin/edit-products/:productId", adminControllers.getEditProduct);

router.put("/api/admin/edit-products", adminControllers.putEditProduct);

router.delete("/api/admin/delete-products", adminControllers.DeleteProduct);

exports.routes = router;

