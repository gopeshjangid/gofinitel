import { useEffect } from "react";
import HeaderBgImg from "../../assets/public/goFintel.svg";

function Home() {
	useEffect(() => {
		document.title = "Log in to goTravel...";
	}, []);
	return (
		<div>
			<div className="home-header">Dashboard</div>
		</div>
	);
}

export default Home;
