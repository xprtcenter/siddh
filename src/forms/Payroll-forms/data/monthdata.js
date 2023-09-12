export const monthsObject = [
	{ value: "1", label: "January" },
	{ value: "2", label: "February" },
	{ value: "3", label: "March" },
	{ value: "4", label: "April" },
	{ value: "5", label: "May" },
	{ value: "6", label: "June" },
	{ value: "7", label: "July" },
	{ value: "8", label: "August" },
	{ value: "9", label: "September" },
	{ value: "10", label: "October" },
	{ value: "11", label: "November" },
	{ value: "12", label: "December" },
];
export const monthsList = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const yearsList = [
	{ value: 2021, label: 2021 },
	{ value: 2022, label: 2022 },
	{ value: 2023, label: 2023 },
	{ value: 2024, label: 2024 },
	{ value: 2025, label: 2025 },
];

export function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}
