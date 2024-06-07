import './Null.scss';
import './App.scss';
import React, { useLayoutEffect } from 'react';
import {
  RouterProvider,
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
import NewList from '../pages/newList/NewList';
import FullDescItem from '../pages/fullDescItem/FullDescItem';
import RandomAnime from '../pages/randomAnime/RandomAnime';
import SearchHeader from '../components/searchHeader/SearchHeader';
import Contacts from '../pages/contacts/Contacts';
import Login from '../pages/login/Login';
import Registration from '../pages/regisration/Registration';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Error from '../pages/error/Error';

// router
import { router } from '../router/router';
// -------------------------------------------------------
// "scripts": {
// "start": "react-app-rewired start",
// "build": "react-app-rewired build",
// "test": "react-app-rewired test",
// "eject": "react-scripts eject"},
// "devDependencies": {
//   "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
//   "@eslint/js": "^8.57.0",
//   "@types/react": "^18.3.3",
//   "@typescript-eslint/parser": "^7.7.1",
//   "assert": "^2.1.0",
//   "buffer": "^6.0.3",
//   "crypto-browserify": "^3.12.0",
//   "dotenv-webpack": "^8.1.0",
//   "eslint": "^8.57.0",
//   "eslint-plugin-react": "^7.34.1",
//   "globals": "^11.12.0",
//   "https-browserify": "^1.0.0",
//   "os-browserify": "^0.3.0",
//   "process": "^0.11.10",
//   "react-app-rewired": "^2.2.1",
//   "sass": "^1.72.0",
//   "stream-browserify": "^3.0.0",
//   "stream-http": "^3.2.0",
//   "url": "^0.11.3"
// }
// -------------------------------------------------------

//{/* <Outlet /> */}

const App = () => {
  // const location = useLocation();
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
  // );

  // useScript('./particles.js');
  return <RouterProvider router={router} />;
};

export default App;
