import React, { useContext, useEffect } from "react";
import Jumbotron from './jumbotron';
import Article from './article';
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [state] = useContext(UserContext);
    useEffect(() => {
        if (state.isLogin === false) {
           if(state.user.role === 'doctor') {
               navigate('/formReservasi');
           }
        } else {
            navigate('/');
        }
    }, [state]);

    return (
        <>
            <Jumbotron />
            <Article />
        </>
    )
}

export default Home;