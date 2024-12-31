import Logovkbrh from "../../../assets/site/VKBRLOGO3.png";
import emergency from "../../../assets/site/24_emg.jpg";

const HeaderTopSmall = () => {
	return (
		<div id="header-top-small" className="hidden w-100 max-w-full px-24">
			<a href="/" className="w-full">
				<img src={Logovkbrh} alt="logo" className="w-[30%]  " />
			</a>
			<div className="flex w-48">
				<img className="h-16 w-16" src={emergency} alt="emergency" />
				<h3 className="text-sm justify-center content-center text-primaryBlueHover">
					HELPLINE : <br />
					<span className="text-nowrap">07580-275310, 07580-350029</span>{" "}
				</h3>
			</div>
		</div>
	);
};

export default HeaderTopSmall;
