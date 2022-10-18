import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvideContext";

function PrivateRoutes({ children }) {
	const authContext = useContext(AuthContext);

	// Show the loading spinner while the user is not authenticated
	if (!authContext.isAuthenticated) {
		return <Navigate to="/" />;
	} else {
		return children;
	}
}

export default PrivateRoutes;
