import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const api_cart = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/cart");
      if (res.ok) {
        const data = await res.json();
        console.log(data.cart);
        setData(data.cart);
        setLoading(false);
      }
    };
    api_cart();
  }, []);

  const api_delete_item = async (id) => {
    const res = await fetch("http://localhost:5000/api/deleteItemCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }), // Gửi dữ liệu data_search dưới dạng JSON
    });
    const data = await res.json();
    console.log("data:", data);
    window.location.reload();
  };
  const click_delete = (id) => {
    api_delete_item(id);
  };

  const click_Order_Now = async () => {
    const res = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data:", data);
    navigate("/order");
  };

  return (
    <main>
      <ul className="cart__item-list">
        {loading === false &&
          error === null &&
          data.map((p) => (
            <li className="cart__item" key={p._id}>
              <h1>{p.productId.title}</h1>
              <h2>Quantity: {p.quantity}</h2>
              <button
                className="btn danger"
                onClick={() => {
                  click_delete(p.productId._id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      <hr />
      <div className="centered">
        <button className="btn" onClick={click_Order_Now}>
          Order Now!
        </button>
      </div>
    </main>
  );
};

export default Cart;
