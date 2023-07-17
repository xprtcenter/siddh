import { firestore } from "../../firebase/firebase.utils";

const dbReg = firestore
	.collection("receptionData")
	.doc("receptionOpdRegistration")
	.collection("opdPatient");

class ReceptionOpdRegService {
	getAll() {
		return dbReg;
	}

	create(sData) {
		return dbReg.add(sData);
	}

	update(id, value) {
		return dbReg.doc(id).update(value);
	}

	delete(id) {
		return dbReg.doc(id).delete();
	}
	getIdData() {}
}

const dbDocMaster = firestore
	.collection("receptionData")
	.doc("receptionDoctorMaster")
	.collection("doctor");

export class ReceptionDoctorMasterService {
	getAll() {
		return dbDocMaster;
	}

	create(sData) {
		return dbDocMaster.add(sData);
	}

	update(id, value) {
		return dbDocMaster.doc(id).update(value);
	}

	delete(id) {
		return dbDocMaster.doc(id).delete();
	}
	getIdData() {}
}

export default new ReceptionOpdRegService();
