import { firestore } from "../../../firebase/firebase.utils";

export const OpdData = firestore
	.collection("receptionData")
	.doc("receptionOpdRegistration")
	.collection("opdPatient");
