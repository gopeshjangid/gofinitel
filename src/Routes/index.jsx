import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { useKeycloak } from "@react-keycloak/web";
import { AuthContext } from "../context/AuthContextProvider";
import Loader from "../pages/UIComponents/Loading";

function Routes({children}) {
	const authContext = useContext(AuthContext);

	// Show the loading spinner while the user is not authenticated
	if (!authContext.isAuthenticated) {
		return <Loader/>;
	}
	return children;
}

export default Routes;
