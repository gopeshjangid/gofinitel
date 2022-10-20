import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Route, Routes as Switch, BrowserRouter } from "react-router-dom";
function App() {
	const authContext = useContext(AuthContext);

	// Show the loading spinner while the user is not authenticated
	if (!authContext.isAuthenticated) {
		return "loading...";
	}
	// If the user is authenticated display the home component
	// else {
	//   return <Home />;
	// }

	return (
		<BrowserRouter>
			<Switch>
				<Route path={"/"} exact element={<Home />} />;
				<Route path={"/dashboard"} exact element={<Dashboard />} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
