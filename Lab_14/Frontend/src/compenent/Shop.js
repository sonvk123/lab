import { useEffect, useState, useRef } from "react";

const Shop = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch("http://localhost:5000/shop");
      const data = await res.json();
      setData(data);
    };
    dataFetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = e.target.elements.productID.value;
    console.log(id);
    fetch("http://localhost:5000/api/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
    <>
      {data.length > 0 ? (
        <div className="grid">
          {data.map((value, i) => (
            <article className="card product-item" key={i}>
              <header className="card__header">
                <h1 className="product__title">{value.title}</h1>
              </header>
              <div className="card__image">
                <img src={value.imageUrl} alt="A Book" />
              </div>
              <div className="card__content">
                <h2 className="product__price">$ {value.price}</h2>
                <p className="product__description">{value.description}</p>
              </div>
              <div className="card__actions">
                <form method="POST" onSubmit={handleSubmit}>
                  <input type="hidden" name="productID" value={value._id} />
                  <button className="btn" type="submit">
                    Add to cart
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h1>No Users Found!</h1>
      )}
    </>
  );
};

export default Shop;
