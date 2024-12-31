import "./side-social-media-icon.css";
import { FaFacebookSquare, FaTwitter, FaYoutube } from "react-icons/fa";
const SideSocialMediaIcons = () => {
	return (
		<div className="socialicon-box ">
			<div className="single-box" style={{ background: "#3b5998" }}>
				<a
					target="_blank"
					href="https://www.facebook.com/profile.php?id=100087191720764"
				>
					<p>
						Follow us on Facebook
						<FaFacebookSquare />
					</p>
				</a>
			</div>

			<div className="single-box" style={{ background: "#4099ff" }}>
				<a target="_blank" href="">
					<p>
						Follow us on Twitter
						<FaTwitter />
					</p>
				</a>
			</div>

			<div className="single-box" style={{ background: "#ff0000" }}>
				<a target="_blank" href="https://www.youtube.com/@vrmvk">
					<p>
						Follow us on Youtube
						<FaYoutube />
					</p>
				</a>
			</div>
		</div>
	);
};

export default SideSocialMediaIcons;
