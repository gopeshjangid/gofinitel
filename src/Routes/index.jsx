import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import { useKeycloak } from "@react-keycloak/web";

const routes = {
	"/": { exact: true, element: Home },
	"/dashboard": { exact: true, element: Dashboard, auth: true },
};

function Routes() {
	const routePaths = Object.keys(routes);

	return (
		<Switch>
			{/* {routePaths.map((path, index) => {
				const route = routes[path];
				const isObj = typeof route !== "function";
				const props = isObj ? route : { element: true };
				const PrivateComponent = route?.element;

				if (!props || !(props?.element || props.render)) {
					throw new Error(
						"Routing Component :mone of the component or render should be a specific path"
					);
				}

				// if (route?.auth) {
				// 	return (
				// 		<Route
				// 			key={path}
				// 			path={path}
				// 			element={
				// 				<PrivateRoutes>
				// 					<PrivateComponent />
				// 				</PrivateRoutes>
				// 			}
				// 		/>
				// 	);
				// } */}
			<Route path={"/"} element={<Home />} />;
			<Route path={"/dashboard"} exact element={<Dashboard />} />;{/* })} */}
		</Switch>
	);
}

export default Routes;
