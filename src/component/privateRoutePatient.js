import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";


function PrivatePatient(){
    const [state,] = useContext(UserContext);
    if(state.isLogin && state.user.role === "patient"){
        return <Outlet />
    } else {
        return <Navigate to="/"/>
    }
}

export default PrivatePatient;