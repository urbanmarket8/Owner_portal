import React, { useEffect } from "react";
import { useQuery } from "../../services/queries/useQuery"
import { connect } from "react-redux";
import {
  RemoveCart,
  increaseCartQuantity,
  showCart,
  ShowCheck,
} from "../../redux/cart/cartAction";
import { listCartApi } from "../../services/api/cart";
import "./style.css";
import { DecreseCount, IncreaseCount } from "../../redux/product/productAction";

const Cart = ({
  increaseProductCount,
  increaseCartQuantity,
  decreaseCartQuantity,
  decreaseProductCount,
  showCart,
  ShowCheck,
}) => {
  const handleUpdateCount = ({ id, quantity, price }) => {
    increaseProductCount(id, quantity);
    increaseCartQuantity(id, quantity, price);
  };
  const handleDecreaseCount = ({ id, quantity, price }) => {
    decreaseCartQuantity(id, quantity, price);
    decreaseProductCount(id, quantity);
  };
  const { data: listCartsQuery } = useQuery(listCartApi);
  return (
    <section className="cart">
      <div className="pop-up">
        <div className="cart-content">
          <div className="cross-icon">
            <i className="fas fa-times" onClick={showCart}></i>
          </div>
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>product name</th>
                  <th>price</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                {listCartsQuery != null && listCartsQuery?.cart?.items?.map((m) => {
                  return (
                    <tr>
                      <td>
                        <div className="cart-body">
                          <div className="cart-image">
                            <img src={m.product.image} alt="cart" />
                          </div>
                          <h4>{m.product.name}</h4>
                        </div>
                      </td>
                      <td> {"₹ " + m.product.price + ".00"}</td>
                      <td>
                        <div className="cart-quantity">
                          <span className="quantity">{m.quantity}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="check-out">
              <span className="total-span">total: </span>
              <span className="price-span">{"₹" + listCartsQuery?.totalPrice + ".00"}</span>
              <button
                className="cart-button check-out-button "
                onClick={ShowCheck}
              >
                proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCartQuantity: (id, quantity, price) =>
      dispatch(increaseCartQuantity(id, quantity, price)),
    decreaseCartQuantity: (id, quantity, price) =>
      dispatch(RemoveCart(id, quantity, price)),
    increaseProductCount: (id, quantity) =>
      dispatch(IncreaseCount(id, quantity)),
    decreaseProductCount: (id, quantity) =>
      dispatch(DecreseCount(id, quantity)),
    showCart: () => dispatch(showCart()),
    ShowCheck: () => dispatch(ShowCheck()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
