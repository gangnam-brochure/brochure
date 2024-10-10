import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import FirstText from './FirstText';
import SecondText from './SecondText';

const MainPage = () => {
  return (
    <div>
      <FirstText />
      <SecondText />
      <Header />
      {/* category => outlet 수정자: 최예지 */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainPage;