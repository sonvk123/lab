import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [decsrription, setDecsrription] = useState("");

  const navigate = useNavigate();

  const input_title = (e) => {
    setTitle(e.target.value);
  };
  const input_image = (e) => {
    setImageUrl(e.target.value);
  };
  const input_price = (e) => {
    setPrice(e.target.value);
  };
  const input_Decsrription = (e) => {
    setDecsrription(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: title,
      imageUrl: imageUrl,
      price: price,
      decsrription: decsrription,
    };
    fetch("http://localhost:5000/api/admin/add-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User added successfully");
          window.location.href = `/admin/Admin-Products`;
        } else {
          console.error("Error adding user");
        }
        navigate("./");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });

    event.target.reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="product-form"
        style={{ display: "block" }}
      >
        <div className="form-control">
          <label>Title</label>
          <input type="title" name="Title" id="Title" onChange={input_title} />
        </div>
        <div className="form-control">
          <label>Image URL</label>
          <input type="url" name="Image" id="Image" onChange={input_image} />
        </div>
        <div className="form-control">
          <label>Price</label>
          <input type="number" name="Price" id="Price" onChange={input_price} />
        </div>
        <div className="form-control">
          <label>Decsrription</label>
          <textarea
            type="text"
            name="Decsrription"
            id="Decsrription"
            onChange={input_Decsrription}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default AddProducts;
