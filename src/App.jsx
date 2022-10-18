import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthProvideContext";
import Routes from "./Routes";

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Routes />
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
