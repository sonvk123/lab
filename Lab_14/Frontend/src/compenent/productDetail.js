import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();

  const productId = params.productId;

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch(`http://localhost:5000/products/${productId}`);
      const data = await res.json();
      setProduct(data);
    };
    dataFetch();
  }, []);

  const add_to_cart = (productId) => {
    fetch("http://localhost:5000/api/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("cart added successfully");
        } else {
          console.error("Error adding cart");
        }
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };
  return (
    <main class="centered">
      <h1>{product.title}</h1>
      <hr />
      <div class="image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <h2> {product.price} </h2>
      <p> {product.description}</p>

      <button class="btn" onClick={() => add_to_cart(product._id)}>
        Add to Cart
      </button>
    </main>
  );
};

export default ProductDetail;
