import {
	Route,
	Routes as Switch,
} from "react-router-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportList from "./pages/ReportList";
import DynamicReport from "./pages/DynamicReport";
import SearchReport from "./pages/SearchReport";
import ProtectedRoute from "./Routes";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./localization/config";
import { Utils } from "./helpers";
import { useEffect } from "react";

const { getCookieByName } = Utils;

function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const selectedLang = getCookieByName("KEYCLOAK_LOCALE");
		console.log("selectedLang", selectedLang);
		i18n.changeLanguage(selectedLang);
	}, []);

	return (
		<I18nextProvider i18n={i18n}>
			<Switch>
				<Route path={"/"} exact element={<Home />} />;
				<Route
					path={"/dashboard"}
					exact
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path={"/dashboard/getLatestReports"}
					exact
					element={
						<ProtectedRoute>
							<ReportList />
						</ProtectedRoute>
					}
				/>
				<Route
					path={"/dashboard/searchContactPerson"}
					exact
					element={
						<ProtectedRoute>
							<DynamicReport />
						</ProtectedRoute>
					}
				/>
				<Route
					path={"/dashboard/searchReport"}
					exact
					element={
						<ProtectedRoute>
							<SearchReport />
						</ProtectedRoute>
					}
				/>
			</Switch>
		</I18nextProvider>);
}

export default App;
