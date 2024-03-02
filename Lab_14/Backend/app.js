const express = require("express");

const cors = require("cors");

const app = express();

const port = 5000;

const { connect, MONGODB_URI } = require("./database/database.js");

const User = require("./models/user");

app.use((req, res, next) => {
  User.findById("65e12dc8716ef805fdf8998b")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

const adminProduct = require("./routes/admin-product");

const cart = require("./routes/cart");

const product = require("./routes/Products");

app.use(cors());

app.use(express.json());

app.use(adminProduct.routes);

app.use(cart.routes);

app.use(product);

connect()
  .then(() => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "Sơn",
            email: "sonnguyen732000@gmail.com",
            cart: {
              tems: [],
            },
          });
          user.save();
        }
      })
      .then(() => {
        app.listen(port, () => {
          console.log("Đã kết nối tới port: ", port)
        });
      })
      .catch((err) => {
        console.log("kết nối thất bại");
        console.log(err);
      });
  })
  .catch((err) => console.log(err));
