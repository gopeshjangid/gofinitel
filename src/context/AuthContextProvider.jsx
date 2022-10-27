import Keycloak from "keycloak-js";
import { createContext, useEffect, useState } from "react";

/**
 * KeycloakConfig configures the connection to the Keycloak server.
 */
const keycloakConfig = {
	realm: "goTravel",
	clientId: "react-web-app",
	url: "http://localhost:8082/auth",
};

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions = {
	// Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
	onLoad: "login-required",
};

// Create the Keycloak client instance
const keycloak = Keycloak(keycloakConfig);

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues = {
	isAuthenticated: false,
	username: "",
	logout: () => {},
	hasRole: (role) => false,
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext(defaultAuthContextValues);

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props) => {
	console.log("rendering AuthContextProvider");

	// Create the local state in which we will keep track if a user is authenticated
	const [isAuthenticated, setAuthenticated] = useState(false);
	// Local state that will contain the users name once it is loaded
	const [username, setUsername] = useState("");

	// Effect used to initialize the Keycloak client. It has no dependencies so it is only rendered when the app is (re-)loaded.
	useEffect(() => {
		/**
		 * Initialize the Keycloak instance
		 */
		async function initializeKeycloak() {
			console.log("initialize Keycloak");
			try {
				const isAuthenticatedResponse = await keycloak.init(
					keycloakInitOptions
				);

				// If the authentication was not successfull the user is send back to the Keycloak login form
				if (!isAuthenticatedResponse) {
					console.log(
						"user is not yet authenticated. forwarding user to login."
					);
					keycloak.login();
				}
				// If we get here the user is authenticated and we can update the state accordingly
				console.log("user already authenticated");
				setAuthenticated(isAuthenticatedResponse);
			} catch {
				console.log("error initializing Keycloak");
				setAuthenticated(false);
			}
		}

		initializeKeycloak();
	}, []);

	// This effect loads the users profile in order to extract the username
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
				console.log("error trying to load the users profile");
			}
		}

		// Only load the profile if a user is authenticated
		if (isAuthenticated) {
			loadProfile();
		}
	}, [isAuthenticated]);

	/**
	 * Initiate the logout
	 */
	const logout = () => {
		keycloak.logout();
	};

	/**
	 * Check if the user has the given role
	 * @param role to be checked
	 * @returns whether or not if the user has the role
	 */
	const hasRole = (role) => {
		return keycloak.hasRealmRole(role);
	};

	// Setup the context provider
	return (
		<AuthContext.Provider
			value={{ isAuthenticated, username, logout, hasRole }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
