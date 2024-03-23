import React, { useState } from "react";
import { useQuery } from "../../services/queries/useQuery";
import { connect } from "react-redux";
import { showOrder } from "../../redux/order/orderAction";
import { listOrderApi } from "../../services/api/order";
import "./style.css";

const Order = ({ showOrder }) => {
  const { data: listOrdersApi } = useQuery(listOrderApi);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const toggleProductList = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "btn-warning"; // Yellow color for pending status
      case "Processing":
        return "btn-info"; // Blue color for processing status
      case "Shipped":
        return "btn-primary"; // Primary color for shipped status
      case "Delivered":
        return "btn-success"; // Green color for delivered status
      default:
        return "btn-secondary"; // Gray color for other statuses
    }
  };

  return (
    <section className="cart">
      <div className="pop-up">
        <div className="cart-content">
          <div className="cross-icon">
            <i className="fas fa-times" onClick={showOrder}></i>
          </div>
          <div className="container">
            {listOrdersApi != null &&
              listOrdersApi.orders.map((order) => (
                <div key={order._id} className="card mb-4">
                  <div className="card-header" onClick={() => toggleProductList(order._id)}>
                    <h5>Order ID: {order._id}</h5>
                    <p>Status: <span className={`btn ${getStatusColor(order.status)}`}>{order.status}</span></p>
                  </div>
                  {selectedOrderId === order._id && (
                    <div className="card-body">
                      <p>Total Price: ${order.totalPrice}</p>
                      <p>Customer: {order.customer.username}</p>
                      <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
                      <h5>Products:</h5>
                      <div className="product-list">
                        {order.items.map((item) => (
                          <div key={item._id} className="product-item">
                            <p>Product: {item.product}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showOrder: () => dispatch(showOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
