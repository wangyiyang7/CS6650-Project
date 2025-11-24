import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const OrderHistoryComponent = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const accountId = localStorage.getItem("accountId");
      try {
        // const userToken = localStorage.getItem("token");
        const orderResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/order/${accountId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //"x-access-token": userToken,
            },
          }
        );
        const orderData = await orderResponse.json();
        setOrders(orderData.orders);
        console.log(orderData.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="order-history-container">
      <div className="order-history">
        <h2>Order History</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.orderNumber} onClick={() => handleOrderClick(order)}>
              {order.orderDate} | Order #: {order.orderNumber}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-details">
        {selectedOrder ? (
          <div>
            <h2>
              Date: {selectedOrder.orderDate} | Order #:{" "}
              {selectedOrder.orderNumber} | Total: $
              {selectedOrder.total.toFixed(2)}
            </h2>
            {selectedOrder.items.map((item) => (
              <div key={item.productId} className="order-item">
                <img
                  src={`/images/${item.productId}.jpg`}
                  alt={item.productName}
                />
                <div className="order-item-content">
                  <span className="order-item-name">{item.productName}</span>
                  <div className="order-item-details">
                    <span className="order-item-quantity">
                      Quantity: {item.quantity}
                    </span>
                    <span className="order-item-price">
                      Price: ${parseFloat(item.price).toFixed(2)}
                    </span>
                    <span className="order-item-subtotal">
                      Subtotal: $
                      {(item.quantity * parseFloat(item.price)).toFixed(2)}
                    </span>
                  </div>
                  <Link
                    to={`/item/${item.productId}`}
                    className="order-item-view-it"
                  >
                    View it
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Please select an order to view details.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryComponent;
