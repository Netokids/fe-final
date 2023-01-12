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

function App() {
  let navigate = useNavigate()

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const [state, dispatch] = useContext(UserContext)


  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.role === 'doctor') {
        navigate('/formReservasi');
      } else if (state.user.role === 'patient') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        })
      }

      let payload = response.data.data
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  }

  console.log(state);

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>

      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/konsultasi" element={<FormConsultation />} />
        <Route path="/inbox/:id" element={<Inbox />} />
        <Route path="/profileDr" element={<ProfileDr />} />
        <Route path="/formArticle" element={<FormArticle />} />
        <Route path="/formReservasi" element={<FormReservasi />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
