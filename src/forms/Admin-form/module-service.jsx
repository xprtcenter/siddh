import { firestore } from "../../firebase/firebase.utils";

const Moduledb = firestore.collection("moduleAndPageMaster");

class ModuleDataService {
	getAll() {
		return Moduledb;
	}

	create(ModuleData) {
		return Moduledb.add(ModuleData);
	}

	update(id, value) {
		return Moduledb.doc(id).update(value);
	}

	delete(id) {
		return Moduledb.doc(id).delete();
	}
}

export default new ModuleDataService();
