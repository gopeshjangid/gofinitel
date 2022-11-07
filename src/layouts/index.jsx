import Header from "./Header";
import Footer from "./Footer";
import "./style.css";

const MainLayout = (props) => {
	const { children } = props;
	return (
		<div className="main-container">
			<Header />
			<main>
				<section>{children}</section>
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
