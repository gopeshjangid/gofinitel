import { useEffect } from "react";
import "./style.css";
import HeaderBgImg from "../../assets/public/goFintel.svg";

function Home() {
	useEffect(() => {
		document.title = "Log in to goTravel";
		const className = document.body.classList;
		className.add("home-body");
	}, []);
	return (
		<div className="main-wrapper">
			<header>
				<div className="home-header">
					<img alt="home-header-logo" src={HeaderBgImg} />
				</div>
			</header>
			<main>
				<div style={{color:"white"}}>You are already logegd in</div>
			</main>
		</div>
	);
}

export default Home;
