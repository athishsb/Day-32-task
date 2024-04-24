import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useSelector } from "react-redux";

function Navbar() {
  const cartQuantity = useSelector((state)=> state.product.cartList)
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">
          <img src="logo.jpg" alt="icon" style={{ width: "150px" }} />
        </a>

        <ul className="navbar-nav ms-auto mb-lg-0 mx-4 fs-5">
          <li className="nav-item">
            <Link className="text-white text-decoration-none" to="/">
              Shop
            </Link>
          </li>
        </ul>
        <Link className="text-white" to="/cart">
          <ShoppingCart size={32} style={{ color: "#ffffff" }} />
          <span
            className="translate-middle badge text-white rounded-pill"
            style={{ backgroundColor: "red" }}
          >
            {cartQuantity.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
