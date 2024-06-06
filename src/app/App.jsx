import './Null.scss';
import './App.scss';
import React, { useLayoutEffect } from 'react';
import {
  // RouterProvider,
  // BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from 'react-router-dom';

// components
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

// pages
import Main from '../pages/main/Main';
import FullDescItem from '../pages/fullDescItem/FullDescItem';
import RandomAnime from '../pages/randomAnime/RandomAnime';
import SearchHeader from '../components/searchHeader/SearchHeader';
import Contacts from '../pages/contacts/Contacts';
import Login from '../pages/login/Login';
import Registration from '../pages/regisration/Registration';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Error from '../pages/error/Error';
import NewList from '../pages/newList/NewList';

// router
import { router } from '../router/router';

//{/* <Outlet /> */}

const App = () => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="wrapper">
      {/* <ParticlesBg color="#d1aee3" num={50} type="cobweb" bg={true} /> */}

      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="fullDescItem/:id" element={<FullDescItem />} />
          <Route path="new/" element={<NewList />} />
          <Route path="random-anime/" element={<RandomAnime />} />
          <Route path="search/" element={<SearchHeader />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="login/user/:id" element={<LoginUserCabinet />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );

  // useScript('./particles.js');
  // return <RouterProvider router={router} />;
};

export default App;
