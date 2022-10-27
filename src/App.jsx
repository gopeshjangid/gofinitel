import { useContext } from "react";
import { Route, Routes as Switch, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./Routes";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
function App() {
	
	return (
			<Switch>
				<Route path={"/"} exact element={<Home />} />;
				<Route path={"/dashboard"} exact element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
			</Switch>
	);
}

export default App;
