import { firestore } from "../../../firebase/firebase.utils";

export const OpdData = firestore
	.collection("payrollData")
	.doc("payrollEmpRegistration")
	.collection("payrollEmployee");
