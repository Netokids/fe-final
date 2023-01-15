import React, { useContext, useEffect } from "react";
import Jumbotron from './jumbotron';
import Article from './article';
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    // jika sewaktu halaman dirender pertama kali ada local storage isAdmin maka navigate
    useEffect(() => {
        state.user.role === "doctor" &&
            navigate(`/formReservasi/${state.user.id}`);
    });
    return (
        <>
            <Jumbotron />
            <Article />
        </>
    )
}

export default Home;