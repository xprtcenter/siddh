import { Link } from "react-router-dom";
import RahulKhandekar from "./DoctorImage/Dr-Rahul-Khandekar.png";
import AKDixit from "./DoctorImage/Dr-Ashok.png";
import MedhaBharade from "./DoctorImage/Dr-Medha-Bharade.png";
import ManjiriJoshi from "./DoctorImage/female.png";
import PragatiSharma from "./DoctorImage/Dr-Pragati-Sharma.png";
import DummyMale from "./DoctorImage/male.png";
import DummyFeMale from "./DoctorImage/female.png";

const DoctorData = [
	{
		id: 1,
		DocName: "Dr. A.K. Dixit",
		src: AKDixit,
		Department: "Physician",
		Degree: "MBBS,MD",
		Timing:
			"Monday To Saturday   09:00 am To 01:00 pm     04:00 pm to 07:00 pm",
	},
	{
		id: 2,
		DocName: "Dr. Medha Bharade",
		src: MedhaBharade,
		Department: "Pediatrician",
		Degree: "MBBS,MD",
		Timing:
			"Monday To Saturday                               09:00 am To 01:00 pm                              04:30 pm to 07:30 pm",
	},
	{
		id: 3,
		DocName: "Dr. Manjiri P. Joshi ",
		src: ManjiriJoshi,
		Department: "Gynecologist",
		Degree: "MBBS,MD",
		Timing:
			"Monday To Saturday                                 09:00 am To 01:00 pm                           04:30 pm to 07:30 pm",
	},
	{
		id: 4,
		DocName: "Dr. Pragati Sharma",
		src: PragatiSharma,
		Department: "Microbiologist",
		Degree: "MBBS,MD",
		Timing:
			"Monday To Saturday                               09:15 am To 01:15 pm                           04:00 pm to 07:00 pm",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyFeMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyFeMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyFeMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyFeMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyFeMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
	{
		id: 5,
		DocName: "Rahul",
		src: DummyFeMale,
		Department: "Optholmology",
		Degree: "MBBS,MD",
	},
];

const Doctor = () => {
	return (
		<div className="doctor-box flex m-2 gap-2 w-[70vw] max-w-fit flex-wrap overflow-scroll max-h-[60vh] ">
			{DoctorData.map((data) => {
				return (
					<div
						key={data.id}
						className="w-[200px] rounded overflow-hidden shadow-lg flex justify-center flex-col border-2 border-brightColor"
					>
						<img
							className="w-[100px] place-self-center"
							src={data.src}
							alt="DocImage"
						/>
						<div className="px-4 py-2">
							<div className="font-bold text-lg mb-1">{data.DocName}</div>
							<p className="text-gray-700 text-base">{data.Department}</p>
							<p className="text-primaryBlue text-xs font-bold">
								{data.Timing}
							</p>
						</div>
						<div className="px-4 py-2 box-border">
							<div className="m-1 bg-primaryBlue rounded-md text-center px-3 text-sm text-white text-nowrap cursor-pointer border-2 hover:bg-white hover:border-2 ease-in-out hover:border-primaryBlue  hover:text-black box-border">
								Book Appointment
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Doctor;
