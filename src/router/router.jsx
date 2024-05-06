import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// pages
import App from '../app/App';
import Layout from '../containers/layout/Layout';
import Main from '../pages/main/Main';
import Contacts from '../pages/contacts/Contacts';
import Login from '../pages/login/Login';
import Registration from '../pages/regisration/Registration';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Error from '../pages/error/Error';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   //   // {
//   //   //   path: '/contacts',
//   //   //   element: <Contacts />,
//   //   // },
//   // {
//   //   path: '*',
//   //   Component: <App />,
//   // },
// ]);

// declare function createRoutesFromElements(
//   children: React.ReactNode
// ): RouteObject[];

// interface RouteObject {
//   caseSensitive?: boolean;
//   children?: RouteObject[];
//   element?: React.ReactNode;
//   index?: boolean;
//   path?: string;
// }

export const router = createBrowserRouter([
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path=":user" element={<LoginUserCabinet />} />
      <Route path="*" errorElement={<Error />} />
    </Route>
  ),
]);

// export const router = createBrowserRouter([{ path: '*', Component: App }]);
