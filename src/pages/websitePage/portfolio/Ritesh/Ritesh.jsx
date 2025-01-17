import "./Ritesh-portfolio.style.css";
import { Link } from "react-router-dom";
import rit from "./ritesh2.png";
import logo from "./xprtlogo.png";

const Ritesh = () => {
	return (
		<>
			<header>
				<div className="navbar">
					<div className="logo">
						<img src={logo} alt="Logo" />
					</div>
					<ul className="menu">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/codepenPortfolio">Projects</a>
						</li>
						<li>
							<a href="/Services">Services</a>
						</li>
						<li>
							<a href="/Contact">Contact</a>
						</li>
					</ul>
				</div>
			</header>

			<div className="content">
				<div className="text-content">
					<div className="text">Hello, It's Me</div>
					<div className="name">
						<span>R</span>itesh <span>R</span>astogi
					</div>
					<div className="animated-text">
						I'm a <span>Web Developer</span>
					</div>
					<div className="button_wrapper">
						<button className="custom-btn-home btn-5">
							<Link to="/aboutme">About Me</Link>
						</button>
						<button className="custom-btn-home btn-5">
							<Link to="/followme">Follow Me</Link>
						</button>
					</div>
				</div>
				<div className="ritesh-image-box">
					<div className="circle circle-1"></div>
					<div className="circle circle-2"></div>
					<div className="circle circle-3"></div>
					<img src={rit} alt="Ritesh" />
				</div>
			</div>

			<section className="about-me">
				<h2>About Me</h2>
				<p>
					I am Ritesh Rastogi, a passionate web and app developer with a knack
					for creating beautiful and functional digital experiences. With
					expertise in modern technologies and a dedication to continuous
					learning, I strive to deliver projects that exceed expectations.
				</p>
			</section>

			<section className="projects">
				<h2>Projects</h2>
				<div className="project-grid">
					<div className="project-card">
						<h3>Project 1</h3>
						<p>A brief description of your project.</p>
					</div>
					<div className="project-card">
						<h3>Project 2</h3>
						<p>A brief description of your project.</p>
					</div>
					<div className="project-card">
						<h3>Project 3</h3>
						<p>A brief description of your project.</p>
					</div>
				</div>
			</section>

			<section className="services">
				<h2>Services</h2>
				<ul>
					<li>Website Development</li>
					<li>Mobile App Development</li>
					<li>UI/UX Design</li>
					<li>SEO Optimization</li>
				</ul>
			</section>

			<section className="contact">
				<h2>Contact Me</h2>
				<p>
					If you'd like to work together or have any questions, feel free to
					reach out!
				</p>
				<form>
					<input type="text" placeholder="Your Name" required />
					<input type="email" placeholder="Your Email" required />
					<textarea placeholder="Your Message" required></textarea>
					<button type="submit">Send Message</button>
				</form>
			</section>

			<footer>
				<p>© 2025 Ritesh Rastogi. All rights reserved.</p>
				<div className="social-links">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
				</div>
			</footer>
		</>
	);
};

export default Ritesh;
