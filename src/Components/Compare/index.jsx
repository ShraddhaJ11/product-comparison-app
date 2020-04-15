import React, { useMemo } from 'react';
import './styles.scss';
import Category from '../Category';
import ProductCard from '../ProductCard';
import AddProduct from '../AddProduct';
import PropTypes from 'prop-types';

/**
 * Component to render product comparison table
 * Parent component to handle all the product comparison related component
 * Product card component is used to display a particular selected product information
 * Add product is used to add new Product for comparison
 * Category is used to display features of a product by its category
 */
function Compare(props) {

  const { selectedProductsId, featuresList, products, setSelectedProductsId } = props;
  const remainingProducts = useMemo(() =>
    products.filter(product => !selectedProductsId.includes(product.id))
    , [products, selectedProductsId]);

  function setChoosedProduct(productId) {
    setSelectedProductsId([...selectedProductsId, productId]);
  }

  /* method to remove a product from selected products list */
  function removeProductId(id) {
    const productsId = [...selectedProductsId]
    const index = productsId.indexOf(id);
    if (index > -1) {
      productsId.splice(index, 1);
    }
    setSelectedProductsId(productsId);
  }

  return (
    <div className="row compare">
      <div className="col-12 mt-5 text-center">
        <table className="table">
          <thead className="thead-default">
            <tr>
              <th>
                <div className="header">
                  <div className="text">Compare</div>
                  <span className="count">{`${selectedProductsId.length} items selected`}</span>
                </div>
              </th>
              {!!products.length && selectedProductsId.map(eleId => {
                const product = products.find(product => product.id === eleId);
                return <th key={product.id}><ProductCard removeProductId={removeProductId} key={product.id} product={product} /></th>
              })}
              {!!remainingProducts.length && selectedProductsId.length < 4 && <th><AddProduct setChoosedProduct={setChoosedProduct} remainingProducts={remainingProducts}></AddProduct></th>}
            </tr>
          </thead>
          <tbody>
            {featuresList.map(feature => {
              return <Category key={feature.title} category={feature} remainingSlots={remainingProducts.length} selectedProductsId={selectedProductsId} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Compare.propTypes = {
  selectedProductsId: PropTypes.array,
  featuresList: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  setSelectedProductsId: PropTypes.func.isRequired
}

export default Compare