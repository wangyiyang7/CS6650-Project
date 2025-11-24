import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeComponent = ({ func }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/products`
        );
        const result = await response.json();

        setItems(result.data.slice(0, 9));
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <div id="products">
        {items.map((item) => (
          <div key={item.id} className="product">
            <Link to={`/item/${item.id}`}>
              <img src={`/images/${item.id}.jpg`} alt={item.productName} />
              <h2>{item.productName}</h2>
            </Link>
            <p>{item.weight}</p>
            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
            <button
              className="add-to-cart"
              onClick={() => {
                func(item);
              }}
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
