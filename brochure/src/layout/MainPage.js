import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import PlaceListNearby from '../components/placelist/PlaceListNearby';

const MainPage = () => {
  return (
    <div>
      <Header />
      <Categories />
      <PlaceListNearby/>
      <Footer />
    </div>
  );
};

export default MainPage;