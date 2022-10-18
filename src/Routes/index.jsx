import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "./PrivateRoutes";

const routes = {
	"/": { exact: true, element: Home },
};

function Routes() {
	const routePaths = Object.keys(routes);

	return (
		<Switch>
			{routePaths.map((path, index) => {
				const route = routes[path];
				const isObj = typeof route !== "function";
				const props = isObj ? route : { element: true };
				const PrivateComponent = route?.element;

				if (!props || !(props?.element || props.render)) {
					throw new Error(
						"Routing Component :mone of the component or render should be a specific path"
					);
				}

				if (route?.auth) {
					return (
						<Route
							key={path}
							path={path}
							element={
								<PrivateRoutes>
									<PrivateComponent />
								</PrivateRoutes>
							}
						/>
					);
				}

				return <Route key={path} path={path} element={<PrivateComponent />} />;
			})}
		</Switch>
	);
}

export default Routes;
