const Products = require("../models/Product");

// thêm 1 sản phẩm mới
exports.postAddProduct = (req, res) => {
  // Xử lý dữ liệu được gửi từ form
  const { title, imageUrl, decsrription, price } = req.body.product;
  const User = req.user;

  const newProducts = new Products({
    title: title,
    price: price,
    description: decsrription,
    imageUrl: imageUrl,
    userId: User,
  });
  newProducts
    .save()
    .then((product) => {
      res.status(200).send("Thêm sản phẩm thành công");
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

// lấy dữ liệu sản phẩm để sửa
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Products.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      } else {
        res.send(product);
      }
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

// sửa sản phẩm
exports.putEditProduct = async (req, res) => {
  const product = req.body.product;
  const prodId = product.id;
  const updatedTitle = product.title;
  const updatedImageUrl = product.imageUrl;
  const updatedPrice = product.price;
  const updatedDesc = product.description;


  const newProduct = new Products(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId,
    req.user._id
  );
  newProduct
    .save()
    .then(() => {
      res.status(200).send({ message: "đã sửa sản phẩm thành công" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.DeleteProduct = async (req, res) => {
  const prodId = req.body.id;
  Products.deleteById(prodId)
    .then(() => {
      res.status(200).send("Đã xóa sản phẩm thành công");
    })
    .catch((err) => console.log(err));
};
