import CarosualData from "./CarosualData";
import "./sliderstyle.css";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

import { useEffect } from "react";

const MainCarousel = () => {
	useEffect(() => {
		//step 1: get DOM
		let nextDom = document.getElementById(`next`);
		let prevDom = document.getElementById(`prev`);

		let carouselDom = document.querySelector(`.main-carousel`);
		let SliderDom = carouselDom.querySelector(`.main-carousel .list`);
		let thumbnailBorderDom = document.querySelector(
			`.main-carousel .thumbnail`,
		);
		let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(`.item`);
		//let timeDom = document.querySelector(`.carousel .time`);

		thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
		let timeRunning = 3000;
		let timeAutoNext = 5000;

		nextDom.onclick = function () {
			showSlider("next");
		};

		prevDom.onclick = function () {
			showSlider("prev");
		};
		let runTimeOut;
		let runNextAuto = setTimeout(() => {
			next.click();
		}, timeAutoNext);
		function showSlider(type) {
			let SliderItemsDom = SliderDom.querySelectorAll(`.carousel .list .item`);
			let thumbnailItemsDom = document.querySelectorAll(
				`.carousel .thumbnail .item`,
			);

			if (type === "next") {
				SliderDom.appendChild(SliderItemsDom[0]);
				thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
				carouselDom.classList.add("next");
			} else {
				SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
				thumbnailBorderDom.prepend(
					thumbnailItemsDom[thumbnailItemsDom.length - 1],
				);
				carouselDom.classList.add("prev");
			}
			clearTimeout(runTimeOut);
			runTimeOut = setTimeout(() => {
				carouselDom.classList.remove("next");
				carouselDom.classList.remove("prev");
			}, timeRunning);

			clearTimeout(runNextAuto);
			runNextAuto = setTimeout(() => {
				next.click();
			}, timeAutoNext);
		}
	}, []);

	return (
		<div>
			<div className="main-carousel z-0 ">
				<div className="list">
					{CarosualData.map(({ id, author, title, imagesrc, topic, dec }) => {
						return (
							<div key={id} className="item">
								<img className="" src={imagesrc} alt={id} />

								<div className="content ">
									<div className="author">{author}</div>
									<div className="title">{title}</div>
									{/* <div className="topic">{topic}</div> */}
									<div className="des">{dec}</div>
									<div className="buttons">
										<button>SEE MORE</button>
										<button>ABOUT US</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="thumbnail">
					{CarosualData.map(({ id, imagesrc, topic, dec2 }) => {
						return (
							<div key={id} className="item">
								<img src={imagesrc} />
								<div className="content">
									<div className="title">{topic}</div>
									{<div className="description">{dec2}</div>}
								</div>
							</div>
						);
					})}
				</div>

				<div className="arrows">
					<button
						id="prev"
						className="flex justify-center items-center pl-2 text-xl"
					>
						<MdArrowBackIos />
					</button>
					<button
						id="next"
						className="flex justify-center items-center  text-xl"
					>
						<MdArrowForwardIos />
					</button>
				</div>
				<div className="time"></div>
			</div>
		</div>
	);
};

export default MainCarousel;
