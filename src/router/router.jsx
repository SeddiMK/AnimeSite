import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// pages
import Layout from '../containers/layout/Layout';
import Main from '../pages/main/Main';
import Contacts from '../pages/contacts/Contacts';
import Login from '../pages/login/Login';
import Registration from '../pages/regisration/Registration';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Error from '../pages/error/Error';

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

// export const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: '/',
//         element: <Main />,
//         errorElement: <Error />,
//       },
//       {
//         path: 'contacts',
//         element: <Contacts />,
//         errorElement: <Error />,
//       },
//       {
//         path: 'login',
//         element: <Login />,
//       },
//       {
//         path: 'registration',
//         element: <Registration />,
//       },
//       {
//         path: ':user',
//         element: <LoginUserCabinet />,
//       },
//       {
//         path: '*',
//         element: <Error />,
//       },
//     ],
//   },
// ]);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Main />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="login" element={<Login />} />
      <Route path="login/user/:id" element={<LoginUserCabinet />} />
      <Route path="registration" element={<Registration />} />

      <Route path="*" element={<Error />} />
    </Route>
  )
);
