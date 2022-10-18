import { useEffect } from "react";
import "./style.css";
import HeaderBgImg from "../../assets/public/goFintel.svg";

function Home() {
	useEffect(() => {
		document.title = "Log in to goTravel";
	}, []);
	return (
		<div className="main-wrapper">
			<header>
				<div className="home-header">
					<img alt="home-header-logo" src={HeaderBgImg} />
				</div>
			</header>
			<main></main>
		</div>
	);
}

export default Home;
