import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';
import { RouterProvider, Route, Routes } from 'react-router-dom';

// router
import { router } from '../router/router';

// pages
import Layout from '../containers/layout/Layout.tsx';
import Main from '../pages/main/Main.jsx';
import Contacts from '../pages/contacts/Contacts.jsx';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet.tsx';
import Login from '../pages/login/Login.tsx';
import Error from '../pages/error/Error.tsx';
import Registration from '../pages/regisration/Registration.tsx';

const App = () => {
  // useScript('./particles.js');

  return (
    <>
      <RouterProvider router={router} />
      {/* <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path=":user" element={<LoginUserCabinet />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes> */}
    </>
  );
};

export default App;
