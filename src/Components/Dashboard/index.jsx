import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsData } from '../../service';
import Compare from '../Compare';
import allActions from '../../Actions';

/**
 * Entry component for product comparison
 */
function Dashboard() {
  const [productsInfo, setProductsInfo] = useState({});  // object to store products information like price,title,image etc
  const [featuresList, setFeaturesList] = useState([]); // array to store features of products
  const [products, setProducts] = useState([]); // array to store transformed products object 
  const [selectedProductsId, setSelectedProductsId] = useState([]); // array of selected products id for comparison
  const loader = useSelector(state => state.loader);
  const dispatch = useDispatch();

  /**
   * useEffect hook to fetch products data from an api
   * empty dependency array indicates that data will fetch from API only when component did mount
   * Calling a service to fetch data from api
   * setting the state with response data
   */
  useEffect(() => {
    dispatch(allActions.loaderActions.start());
    async function fetchData() {
      const response = await getProductsData();
      setProductsInfo(response.compareSummary);
      setFeaturesList(response.featuresList);
      dispatch(allActions.loaderActions.end());
    }
    fetchData();
  }, [dispatch]);

  /* method to get the ids of all the products */
  function getProductsIdList(data) {
    return data.images && Object.keys(data.images)
  }

  /* method to transform the product compare summary data */
  function transformData(data) {
    const products = [];
    const productsId = getProductsIdList(data);
    productsId && productsId.forEach(item => {
      let productObj = {};
      for (let [key, value] of Object.entries(data)) {
        productObj = {
          ...productObj,
          id: item,
          [key]: value[item]
        }
      }
      products.push(productObj);
    })
    setProducts(products);
  }

  useEffect(() => {
    transformData(productsInfo);
  }, [productsInfo])

  return (
    !loader ? <div className="mt-5">
      <div className="row">
        <h2 align="center" className="mb-3">Compare Products</h2>
      </div>
      <Compare selectedProductsId={selectedProductsId} featuresList={featuresList} setSelectedProductsId={setSelectedProductsId} products={products}></Compare>
    </div> : <div>Loading...</div>
  )
}

export default Dashboard;