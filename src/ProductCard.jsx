import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="col-4">
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <img src={product.images[0]} alt={product.name} />
        <h4>{product.name}</h4>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <p>${Number(product.price).toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
