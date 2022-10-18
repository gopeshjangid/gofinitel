import { createContext, useState, useEffect } from "react";
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const keycloakConfig = {
	realm: "goTravel",
	clientId: "react-webapp",
	url: "http://localhost:8082/auth",
};

const keycloakInitOptions = {
	// Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
	onLoad: "login-required",
};

const keycloak = Keycloak(keycloakConfig);

const defaultAuthContextValues = {
	isAuthenticated: false,
	logout: () => {},
	username: "",
};

/**
 * AuthContext is the context exposed by the {@link AuthContextProvider}.
 */
export const AuthContext = createContext(defaultAuthContextValues);

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props) => {
	// This is just here to check that we setup the provider correctly.
	console.log("rendering AuthContextProvider");
	const [username, setUsername] = useState("");
	// Creating the local state to keep track of the authentication
	const [isAuthenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		/**
		 * Initialize the Keycloak instance
		 */
		async function initializeKeycloak() {
			try {
				const isAuthenticatedResponse = await keycloak.init(
					keycloakInitOptions
				);

				if (!isAuthenticatedResponse) {
					console.log(
						"user is not yet authenticated. forwarding user to login."
					);
					keycloak.login();
				}
				console.log("user already authenticated");
				setAuthenticated(isAuthenticatedResponse);
			} catch {
				console.log("error initializing Keycloak");
				setAuthenticated(false);
			}
		}

		initializeKeycloak();
	}, []);

	useEffect(() => {
		/**
		 * Load the profile for of the user from Keycloak
		 */
		async function loadProfile() {
			try {
				const profile = await keycloak.loadUserProfile();
				if (profile.firstName) {
					setUsername(profile.firstName);
				} else if (profile.username) {
					setUsername(profile.username);
				}
			} catch {
				console.log("error trying to load the user profile");
			}
		}

		// Only load the profile if a user is authenticated
		if (isAuthenticated) {
			loadProfile();
		}
	}, [isAuthenticated]);

	const logout = () => {
		keycloak.logout();
	};

	return (
		// Creating the provider and passing the state into it. Whenever the state changes the components using this context will be re-rendered.
		<AuthContext.Provider value={{ isAuthenticated, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
