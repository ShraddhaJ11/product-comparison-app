import { url } from './constants';

/** Service to fetch the data from the API */
export async function getProductsData() {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const json = await response.json();
    return json.products;
  } catch (err) {
    console.log(err);
  }
}