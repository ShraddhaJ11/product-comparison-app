import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * Product card component to add new product for comparison
 */
function AddProduct({ remainingProducts, setChoosedProduct }) {

  const [selectedProduct, setSelectedProduct] = useState('Choose a Product');

  /* function to add choosen product id to selectedProductsId */
  function chooseProduct(e) {
    setSelectedProduct(e.target.value);
    setChoosedProduct(e.target.value)
  }

  return (
    <div className="new_product">
      <div className="container">
      </div>
      <div className="new_product_name">Add a product</div>
      <select className="new_product_selection" onChange={chooseProduct} value={selectedProduct}>
        <option key='Choose a Product' value='Choose a Product'>Choose a Product</option>
        {
          !!remainingProducts.length && remainingProducts.map(product => {
            const title = product.id === "TVSF3J7HUJF5XUBT" ? "iFFALCON K2A 138.71cm(55) HD (4K)" : product.titles.title
            return <option key={product.id} value={product.id} title={product.titles.title}>{title}</option>
          }
          )}
      </select>
    </div>
  )
}

AddProduct.propTypes = {
  remainingProducts: PropTypes.array.isRequired,
  setChoosedProduct: PropTypes.func.isRequired
}

export default AddProduct;