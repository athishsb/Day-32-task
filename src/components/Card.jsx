import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addCart, deleteCart } from "../Redux/Reducers/Products.reducers";
import { createSelector } from "reselect";

const cartListSelector = (state) => state.product.cartList;

const cartIdsSelector = createSelector(cartListSelector, (cartList) =>
  cartList.map((item) => item.id)
);

function Card({ product = {} }) {
  const dispatcher = useDispatch();
  const cartIds = useSelector(cartIdsSelector);
  const [isIncart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cartIds.includes(product.id));
  }, [cartIds, product.id]);
  
  const handleAdd = useCallback(() => {
    setIsInCart(true);
    dispatcher(addCart(product));
  },[dispatcher, product]);
  
  const handleRemove = useCallback(() => {
    setIsInCart(false);
    dispatcher(deleteCart(product.id));
  },[dispatcher, product]);

  return (
    <div className="card h-100 p-3 m-2 product-card">
      <img
        className="card-img"
        style={{ width: "150px", alignSelf: "center" }}
        src={product.images}
        alt={product.title}
      />
      <div className="card-body d-flex position-relative">
        <h4 className="fs-4 m-1">{product.title} </h4>
        <p className="mt-4 position-absolute top-0 end-0">
          ⭐ {product.rating}
        </p>
      </div>
      <p className="mt-1">
        {product.description
          ? product.description.slice(0, 75) + `...`
          : product.description}
      </p>
      <p className="mt-1">
        <span>
          <strong className="d-inline fs-4">
            ₹
            {(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
          </strong>
        </span>
        <span className="text-danger text-decoration-line-through px-2 text-lg">
          ₹{product.price}
        </span>
        <span className="text-success">{product.discountPercentage}% OFF</span>
      </p>
      {isIncart ? (
        <button
          className="p-1 btn btn-danger"
          onClick={handleRemove}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="p-1 btn btn-success"
          onClick={handleAdd}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default Card;

Card.propTypes = {
  product: PropTypes.object,
};
