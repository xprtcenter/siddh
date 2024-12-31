/** @type {import('tailwindcss').Config} */

export default {
	content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				hoverColor: "#FFC000",
				brightColor: "#dd8036",
				backgroundColor: "#36ae9a",
				primaryOrange: "#F86923",
				primaryOrangeLight1: "#F67155",
				primaryOrangeLight2: "#F9937D",
				primaryBlue: "#0467AA",
				primaryBlueHover: "#17509b",
				primaryYellow: "#FDDC00",
			},
		},
	},
	plugins: [],
};
//text-[#F86923]
