import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Loader from "../components/Loading";

function Routes({children}) {
	const authContext = useContext(AuthContext);

	// Show the loading spinner while the user is not authenticated
	if (!authContext.isAuthenticated) {
		return <Loader/>;
	}
	return children;
}

export default Routes;
