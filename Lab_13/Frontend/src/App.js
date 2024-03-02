import { React } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayout from "./compenent/layout/RootLayout";
import Shop from "./compenent/Shop";
import Products from "./compenent/Products";
import ProductDetail from "./compenent/productDetail";
import Cart from "./compenent/Cart";
import Order from "./compenent/Order";
import AdminAddProducts from "./compenent/Add-products";
import AdminEditProducts from "./compenent/Edit-Product";
import AdminProducts from "./compenent/Admin-Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Shop /> },
      { path: "/shop", element: <Navigate to="/" /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:productId", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      {
        path: "/admin",
        children: [
          {
            path: "add-products",
            element: <AdminAddProducts />,
          },
          {
            path: "Admin-Products",
            element: <AdminProducts />,
          },
          {
            path: "Edit-Products/:productId",
            element: <AdminEditProducts />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
