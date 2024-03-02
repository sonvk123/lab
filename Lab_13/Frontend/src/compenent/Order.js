import React, { useEffect, useState } from "react";

import "../CSS/cart.css";
import "../CSS/main.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api_cart = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/orders");
      if (res.ok) {
        const data = await res.json();
        console.log(data.orders);
        setOrders(data.orders);
        setLoading(false);
        setError(null);
      }
    };
    api_cart();
  }, []);

  return (
    <main>
      <ul>
        {loading === false && error === null && orders.length > 0 ? (
          orders.map((order) => (
            <li>
              <h1>{order._id}</h1>
              <ul>
                {order.products.map((product) => (
                  <li>
                    title: {product.product.title}, quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <h1>Nothing there!</h1>
        )}
      </ul>
    </main>
  );
};

export default Order;
