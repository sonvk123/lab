import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="main-header">
      <nav className="main-header__nav ">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink to="/">Shop</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/order">Order</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/admin/add-products">Add Products</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/admin/Admin-Products">Admin Products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default NavBar;
