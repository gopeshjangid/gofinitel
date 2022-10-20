import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvideContext";

function PrivateRoutes({ children }) {
	const authContext = useContext(AuthContext);

	if (!authContext.isAuthenticated) {
		return <Navigate to="/" />;
	}

	return children;
}

export default PrivateRoutes;
