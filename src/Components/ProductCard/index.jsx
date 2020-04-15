import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * Component to display a particular product information i.e. image , title and price 
 */
function ProductCard(props) {
  const { product, removeProductId } = props;


  /* Handler method to remove a product from comparison table */
  function removeProduct(id) {
    removeProductId(id)
  }
  return (
    <div className="product">
      <span className="cross_button" onClick={() => removeProduct(product.id)}>&#10005;</span>
      <div className="product_image">
        <img src={product.images} alt={product.title} />
      </div>
      <div className="product_name" title={product.titles.title}>{product.titles.title}</div>
      <div>
        <span className="product_price">&#x20B9;{Math.trunc(product.productPricingSummary.finalPrice)}</span>
        <span className="product_price total_price"><strike>&#x20B9;{Math.trunc(product.productPricingSummary.price)}</strike></span>
        <span className="product_price discount">{`${product.productPricingSummary.totalDiscount}% off`}</span>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  removeProductId: PropTypes.func.isRequired
}

export default ProductCard;