const Products = require("../models/Product");

const Order = require("../models/order");

// lấy sản phẩm cho trang cart
exports.getShop = (req, res) => {
  Products.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

// thêm sản phẩm vào giỏ hàng
exports.postAddCart = (req, res) => {
  const prodId = req.body.id;
  Products.findById(prodId)
    .then((product) => {
      req.user
        .addToCart(product)
        .then((aaa) => {
          console.log("aaa:", aaa);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

// trang cart
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then((user) => {
      const cart = user.cart.items;
      res
        .status(200)
        .send({ message: "lấy dữ liệu trang cart thành công", cart });
    })
    .catch((err) => console.log(err));
};

// xóa sản phẩm trong giỏ hàng
exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;

  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.status(200).send({ message: "Đã xóa sản phẩm thành công" });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.postCreateOrder = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });

      const order = new Order({
        products: products,
        user: {
          name: req.user.name,
          userId: req.user,
        },
      });

      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then((result) => {
      res.status(200).send({ message: "Đã tạo Order thành công" });
    })
    .catch((err) => console.log(err));
};

// trang Orders
exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      if (!orders) {
        const orders = [];
        return res.send({
          message: "Lấy dữ liệu trang order thành công",
          orders,
        });
      } else {
        return res.send({
          message: "Lấy dữ liệu trang order thành công",
          orders,
        });
      }
    })
    .catch((err) => console.log(err));
};
