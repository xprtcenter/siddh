import { firestore } from "../../../firebase/firebase.utils";

export const EmployeeData = firestore
	.collection("payrollData")
	.doc("payrollEmpRegistration")
	.collection("payrollEmployee");

export const EmployeeDeduction = firestore
	.collection("payrollData")
	.doc("payrollDeduction")
	.collection("payrollDeductionEntry");
