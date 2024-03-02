const Products = require("../models/Product");

// lấy dữ liệu trang Product
exports.getProducts = (req, res) => {
  Products.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

// lấy dữ liệu trang Product Detail
exports.getProductDetail = (req, res) => {
  const productId = req.params.productId;
  Products.findById(productId)
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log("err:", err);
    });
};
