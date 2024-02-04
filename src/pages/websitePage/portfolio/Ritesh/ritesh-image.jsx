import "./ritesh-image.style.css";
import rit from "./ritesh2.png";
const RiteshImage = () => {
	return (
		<div className="ritesh-image-box">
			<div className="circle circle-1"></div>
			<div className="circle circle-2"></div>
			<div className="circle circle-3"></div>
			<img src={rit} alt="ritesh" />
		</div>
	);
};

export default RiteshImage;
