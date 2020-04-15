import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * Component to render features of a product by its category
 */
function Category({ category, selectedProductsId, remainingSlots }) {
  return (
    <>
      <tr style={{ background: '#f9f9f9', textAlign: "left" }}>
        <th key={category.title}>
          {(category.title).toUpperCase()}
        </th>
        {!!remainingSlots && selectedProductsId.length < 4 && <th />}
        {selectedProductsId.map((id, index) => {
          return index < selectedProductsId.length && <th key={id}></th>
        })}
      </tr>
      {category.features.map(subcat =>
        <tr key={subcat.featureName}>
          <th scope="row">{subcat.featureName}</th>
          {selectedProductsId.map(id =>
            <td key={id} className="text-center">{subcat.values[id]}</td>
          )}
        </tr>
      )}
    </>
  )
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  selectedProductsId: PropTypes.array.isRequired
}

export default Category;