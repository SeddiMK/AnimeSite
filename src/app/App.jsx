import './Null.scss';
import './App.scss';
import React, { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  RouterProvider,
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// components
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

// pages
import Main from '../pages/main/Main';
import NewList from '../pages/newList/NewList';
import FullDescItem from '../pages/fullDescItem/FullDescItem';
import RandomAnime from '../pages/randomAnime/RandomAnime';
import SearchHeader from '../components/searchHeader/SearchHeader';
import Contacts from '../pages/contacts/Contacts';
import Login from '../pages/login/Login';
import Registration from '../pages/regisration/Registration';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Error from '../pages/error/Error';

import ScrollToTop from '../components/scrollToTop';

// router
import { router } from '../router/router';
// -------------------------------------------------------

import store from '../store/index';
import { ErrorBoundary, withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../pages/errorFallback/ErrorFallback';
import Layout from '../containers/layout/Layout';

const App = () => {
  // скролл вверх при переходе на др стр
  // const location = useLocation(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // // Scroll to top if path changes
  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  // return (
  //   <div className="wrapper">
  //     {/* <ParticlesBg color="#d1aee3" num={50} type="cobweb" bg={true} /> */}

  //     <Header />
  //     <div className="container">
  //       <Routes>
  //         <Route path="/" element={<Main />} />
  //         <Route path="fullDescItem/:id" element={<FullDescItem />} />
  //         <Route path="new/" element={<NewList />} />
  //         <Route path="random-anime/" element={<RandomAnime />} />
  //         <Route path="search/" element={<SearchHeader />} />
  //         <Route path="contacts" element={<Contacts />} />
  //         <Route path="login" element={<Login />} />
  //         <Route path="login/user/:id" element={<LoginUserCabinet />} />
  //         <Route path="registration" element={<Registration />} />
  //         <Route path="*" element={<Error />} />
  //       </Routes>
  //     </div>
  //     <Footer />
  //   </div>

  // useScript('./particles.js');
  // <BrowserRouter>
  //  {/* <RouterProvider router={router} />{' '} */}
  //  </BrowserRouter>
  //  {/* <ParticlesBg color="#d1aee3" num={50} type="cobweb" bg={true} /> */}
  //{/* <Outlet /> */}
  // <Layout />
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="wrapper">
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
      </BrowserRouter>
    </Provider>
  );
};

export default withErrorBoundary(App, {
  FallbackComponent: <ErrorFallback />,
});
