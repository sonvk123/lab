import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const EditProducts = () => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const productId = params.productId;

  useEffect(() => {
    const api_edit_product = async () => {
      const res = await fetch(
        `http://localhost:5000/api/admin/edit-products/${productId}?edit=true`
      );
      const data = await res.json();
      setProduct(data);
    };
    api_edit_product();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.elements.Title.value;
    const imageUrl = event.target.elements.Image.value;
    const price = event.target.elements.Price.value;
    const description = event.target.elements.Description.value;

    const product = {
      id: productId,
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    };

    fetch("http://localhost:5000/api/admin/edit-products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User edit successfully");
          navigate("/admin/Admin-Products");
        } else {
          console.error("Error edit user");
        }
      })
      .catch((error) => {
        console.error("Error edit user:", error);
      });

    event.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={product.title}
            onChange={(event) =>
              setProduct({ ...product, title: event.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label>Image URL</label>
          <input
            type="url"
            name="Image"
            id="Image"
            value={product.imageUrl}
            onChange={(event) =>
              setProduct({ ...product, imageUrl: event.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label>Price</label>
          <input
            type="number"
            name="Price"
            id="Price"
            value={product.price}
            onChange={(event) =>
              setProduct({ ...product, price: event.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label>Decsrription</label>
          <textarea
            type="text"
            name="Description"
            id="Description"
            value={product.description}
            onChange={(event) =>
              setProduct({ ...product, description: event.target.value })
            }
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </>
  );
};

export default EditProducts;
