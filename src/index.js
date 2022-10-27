import React from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./context/AuthContextProvider";
import {  BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
					<App />
			</BrowserRouter>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<React.StrictMode>
// 	<AuthContextProvider>
// 		<BrowserRouter>
// 				<App />
// 		</BrowserRouter>
// 	</AuthContextProvider>
// </React.StrictMode>);

reportWebVitals();
