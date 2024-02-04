import "./Ritesh-portfolio.style.css";

import RiteshImage from "./ritesh-image";
import logo from "./xprtlogo.png";
const Ritesh = () => {
	return (
		<>
			<header>
				<div className="navbar">
					<div className="logo">
						<img src={logo} alt="" />
					</div>

					<ul className="menu">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="project">Projects</a>
						</li>

						<li>
							<a href="#">Services</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</div>
			</header>
			<div className="content">
				<div className="text-content">
					<div className="text">Hello, It's Me </div>

					<div className="name">
						<span>R</span>itesh <span>R</span>astogi
					</div>

					<div className="animated-text">
						I'm a <span></span>
					</div>

					<div className="button_wrapper">
						<button className="custom-btn btn-5">About Me</button>
						<button className="custom-btn btn-5">Follow Me</button>
					</div>
				</div>
				<RiteshImage />
			</div>
		</>
	);
};

export default Ritesh;
