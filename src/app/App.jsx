import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

// router
import { router } from '../router/router';

// pages
import Layout from '../containers/layout/Layout';
import Main from '../pages/main/Main';
import Contacts from '../pages/contacts/Contacts';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Login from '../pages/login/Login';
import Error from '../pages/error/Error';
import Registration from '../pages/regisration/Registration';

const App = () => {
  // useScript('./particles.js');

  return <RouterProvider router={router} />;
};

export default App;
