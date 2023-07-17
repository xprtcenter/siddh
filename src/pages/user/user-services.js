import { firestore } from "../../firebase/firebase.utils";

const UserDb = firestore.collection("users");

class UserDataServices {
	getAll() {
		return UserDb;
	}

	create(UserData) {
		return UserDb.add(UserData);
	}

	update(id, value) {
		return UserDb.doc(id).update(value);
	}

	delete(id) {
		return UserDb.doc(id).delete();
	}
}

export default new UserDataServices();
