import React from 'react';
import Products from '../../features/Products/ProductsContainer';
import SideBar from '../../features/SideBar/SideBar'
import './HomePage.scss'


const HomePage = () => (
  <div className='home-page'>
      <SideBar />
    <Products />
  </div>
);

export default HomePage;