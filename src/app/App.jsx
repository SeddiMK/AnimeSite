import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';
import { Route, Routes } from 'react-router-dom';

// pages
import Layout from '../containers/layout/Layout';
import Main from '../pages/main/Main.jsx';
import Contacts from '../pages/contacts/Contacts';
import LoginUserCabinet from '../pages/loginUserCabinet/LoginUserCabinet';
import Login from '../pages/login/Login';
import Error from '../pages/error/Error';
import Registration from '../containers/regisration/Registration.jsx';

const App = () => {
  // useScript('./particles.js');

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          {/* <Route path="user:" element={<Registration />} /> */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
