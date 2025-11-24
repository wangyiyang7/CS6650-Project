import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemComponent = ({ addToCart }) => {
  const params = useParams();
  const id = params.id || params.productId;

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/products/${id}`
        );

        const result = await response.json();
        setItem(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div id="product-detail">
      <div id="detail-image">
        <img src={`/images/${item.id}.jpg`} alt={item.productName} />
      </div>
      <div id="details">
        <h2>{item.productName}</h2>
        <p>{item.weight}</p>
        <p>Price: ${item.price}</p>
        <button className="add-to-cart" onClick={() => addToCart(item)}>
          + Add
        </button>
        <p id="ingr">Ingredients: {item.ingredients}</p>
      </div>
    </div>
  );
};

export default ItemComponent;
