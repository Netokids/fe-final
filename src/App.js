import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Profile from './component/profile';
import NavigationBar from './component/navbar';
import Detail from './component/detail';
import FormConsultation from './component/FormConsultation';
import Inbox from './component/inbox';
import ProfileDr from './component/profileDr';
import FormArticle from './component/FormAddArticle';
import FormReservasi from './component/formReservasi';
import { UserContext } from './context/userContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from './config/api';
import { API } from './config/api';
import PrivatePatient from './component/privateRoutePatient';
import PrivateAdmin from './component/privateAdmin';
import RegisterDoctor from './component/registerDoctor';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext)
  console.log(state)  

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>

      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route element={<PrivatePatient />}>
          <Route exact path="/konsultasi" element={<FormConsultation />} />
          <Route exact path="/profile/:id" element={<Profile />}></Route>
          <Route exact path="/inbox/:id" element={<Inbox />} />
        </Route>
        <Route element={<PrivateAdmin />}>
          <Route exact path="/formReservasi/:id" element={<FormReservasi />} />
          <Route exact path="/formArticle" element={<FormArticle />} />
          <Route exact path="/profileDr/:id" element={<ProfileDr />} />
        </Route>

        
        <Route exact path="/registerDoctor" element={<RegisterDoctor />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
