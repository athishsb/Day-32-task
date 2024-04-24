import { useDispatch, useSelector } from "react-redux";
import { cartUpdate, deleteCart } from "../Redux/Reducers/Products.reducers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Cart() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.product.cartList);

  const [quantities, setQuantities] = useState(
    Object.fromEntries(
      cartData.map((product) => [product.id, product.quantity])
    )
  );
  const handleRemove = (id) => {
    dispatcher(deleteCart(id));
  };
  const handleQuantityChange = (e, id) => {
    const newQuantity = parseInt(e.target.value);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
    dispatcher(cartUpdate({ id, quantity: newQuantity }));
  };

  return (
    <>
      {cartData.length > 0 ? (
        <div className="mt-5 mb-3 container bg-white">
          <div className="row row-gap-3">
            {cartData.map((product) => {
              return (
                <div
                  key={product.id}
                  className="card col-sm-12 col-md-12 col-lg-12 bg-light d-flex flex-column align-items-center justify-content-center cart-colDiv"
                >
                  <div className="row d-flex justify-content-between align-items-center cart-part1">
                    <div className="col-md-8 col-lg-8 d-flex justify-content-between h-100 cart-lf">
                      <div className="col-4 cart-lf-imgDiv">
                        <img
                          className="img-thumbnail h-100"
                          src={product.images}
                          alt={product.title}
                        />
                      </div>
                      <div className="col-8 d-flex px-3 flex-column justify-content-between">
                        <h5 className="card-title pt-2">
                          {product.title}
                        </h5>
                        <p className="cart-text text-muted cart-t1">
                          {product.brand}
                        </p>
                        <p className="card-text cart-lt-text">
                          {product.description}
                        </p>
                        <p className="card-text text-muted pb-3 cart-t1">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4 col-lg-4 h-100 d-flex justify-content-between align-items-center cart-rt">
                      <div className="col-sm-10 col-md-6 col-lg-5 cart-select">
                        <div className="selDiv">
                          <select
                          value={quantities[product.id]}
                            onChange={(e) => handleQuantityChange(e,product.id)
                            }
                            className="sel"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                          </select>
                        </div>
                        <div className="cart-price">₹{product.newPrice}</div>
                      </div>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="btn btn-danger border-0 cart-remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <hr className="hr1" />

                  <div className="row text-muted cart-part2">
                    <div className="col-12 d-flex justify-content-between align-items-center cart-one">
                      <p>SUBTOTAL</p>
                      <p>
                        ₹
                        {product.subtotal == product.newPrice
                          ? product.newPrice.toFixed(2)
                          : product.subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="col-12 d-flex justify-content-between align-items-center cart-two p-0 m-0">
                      <p className="p-0 m-0">SHIPPING</p>
                      <p
                        className={product.shipFee ? "cart-ship" : "cart-ship2"}
                      >
                        ₹{product.shipFee ? product.shipFee : "FREE"}
                      </p>
                    </div>
                  </div>

                  <hr className="my-0 hr2" />

                  <div className="row d-flex flex-column justify-content-between align-items-center cart-part3">
                    <div className="col-12 d-flex justify-content-between align-items-center cart-three">
                      <p>TOTAL</p>
                      <p>
                        ₹
                        {product.shipFee
                          ? (product.subtotal + +product.shipFee).toFixed(2)
                          : product.subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="col-12 d-flex justify-content-end align-items-center cart-four">
                      <p>{"Get Daily Cash with Nespola Card"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <p className="mt-4 fs-1 text-danger">Your R-Cart is empty😔</p>
          <img
            src="https://media.tenor.com/8Bt28MKNs7sAAAAi/shopping-cart-ecomm.gif"
            alt="cart"
            className="mt-2"
          />
          <button
            className="btn btn-primary ms-5 mt-3"
            onClick={() => navigate("/")}
          >
            Shop now
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
