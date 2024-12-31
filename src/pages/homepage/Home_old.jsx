/* import { useState, useEffect } from "react";
import "./Home.styles.css";
import Footer from "../../component/othersite/Footer/Footer";
import Header from "../../component/othersite/Header/Header";
import SideSocialMediaIcons from "../../component/othersite/social-media/side-social-media-icons";
import Omanimated from "../../assets/site/omanimated2.gif";
import ScrollButton from "../../component/othersite/ScrollToTop";

const Home = () => {
	const [loading, setLoading] = useState(false);
	//const dispatch = useDispatch();

	return !loading ? (
		<div className="">
			<Header />
			<SideSocialMediaIcons />

			<Footer />
			<ScrollButton />
		</div>
	) : (
		<div className="flex justify-center">
			<img className="w-[20vw]" src={Omanimated} alt="" />
		</div>
	);
};

export default Home;
 */
