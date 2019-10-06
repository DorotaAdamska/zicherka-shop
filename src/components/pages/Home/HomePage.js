import React from 'react';
import Products from '../../features/Products/ProductsContainer';


const HomePage = () => (
  <div>
    <h1>Home Page</h1> 
    <Products productsPerPage={6} pagination={true}/>
  </div>
);

export default HomePage;