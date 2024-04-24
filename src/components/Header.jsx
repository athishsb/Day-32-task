import { useSelector } from "react-redux";

function Header() {
  const cartData = useSelector((state) => state.product.cartList);

  let total = cartData.reduce((acc, item) => {
    return acc + item.subtotal + +item.shipFee;
  }, 0);
  let totalQty = cartData.reduce((acc, item) => {
    return acc + +item.quantity;
  }, 0);
  return (
    <>
      <header>
        <div className="row bg-light d-flex justify-content-between align-items-center py-3">
          <div className="col">Total QTY: {totalQty}</div>
          <div className="col">
            Total Price: {total ? `₹${total.toFixed(2)}` : "Add Items"}
          </div>
          <div className="col-auto">
            <div className="btn btn-primary">Proceed to pay</div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
