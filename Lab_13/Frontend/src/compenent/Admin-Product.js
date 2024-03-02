import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch("http://localhost:5000/shop");
      const data = await res.json();
      setData(data);
    };
    dataFetch();
  }, []);

  const edit_product = (id) => {
    window.location.href = `/admin/Edit-Products/${id}?edit=true`;
  };

  const add_cart = (id) => {
    const url = `http://localhost:5000/api/add-cart`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Đã thêm sản phẩm thành công");
        } else {
          console.error("Lỗi khi thêm sản phẩm");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const delete_products = (id) => {
    const check = window.confirm("Có muốn xóa sản phẩm");
    if (!check) {
      return;
    }
    const url = `http://localhost:5000/api/admin/delete-products`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Đã xóa sản phẩm thành công");
          window.location.reload();
        } else {
          console.error("Lỗi khi xóa sản phẩm");
        }
      })
      .catch((error) => {
        console.error(error);
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
                <button
                  className="btn"
                  onClick={() => {
                    edit_product(value._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    add_cart(value._id);
                  }}
                >
                  Add to cart
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    delete_products(value._id);
                  }}
                >
                  Delete
                </button>
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

export default AdminProducts;
