// import LogoSwamiji from "../../assets/VKBRLOGO3.png";
import LogoSwamiji from "../../../assets/site/VKBRLOGO3.png";
// import LogoSwamiji from "../../assets/VRMVK-Logo.png";
// import LogoBPCL from "../../assets/bpcl_logo_1.jpg";
import LogoBPCL from "../../../assets/site/bpcl_logo_1.jpg";
const HeaderTopFull = () => {
	return (
		<div
			id="header-top-full"
			className="w-[100vw] hidden md:flex items-center px-10"
		>
			<div className="logo1 ">
				<img className="w-[9vw]" src={LogoSwamiji}></img>
			</div>
			<div className="menu-container flex flex-col w-[100vw] justify-between items-center">
				<div className="text-primaryBlue text-sm font-bold">
					SERVE MAN SERVE GOD
				</div>
				<div className="hospital-name poppins-bold text-primaryOrange">
					<span
						style={{
							fontFamily: `Poppins, sans-serif !important`,
							fontWeight: "700",
							fontStyle: "normal",
						}}
						className="text-[3vw] whitespace-nowrap leading-none"
					>
						VIVEKANANDA KENDRA BINA REFINERY HOSPITAL
					</span>
				</div>
				<div className="address text-lg whitespace-nowrap px-5 ">
					BPCL Residencial Complex, Bina (MP) 470124 ☎️ 07580-275310,
					07580-350029 📧 vkbrh@vkendra.org
				</div>
			</div>
			<div className="logo2 flex justify-center items-center pr-5 pt-1">
				<img src={LogoBPCL} className="w-[6.5vw] "></img>
			</div>
		</div>
	);
};

export default HeaderTopFull;
