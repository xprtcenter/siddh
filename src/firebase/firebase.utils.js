import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

/* const config = {
	apiKey: "AIzaSyCCLLEUyHEZZUThEJqwPTY4pI6D1x70J6o",
	authDomain: "crwn-db-fbee8.firebaseapp.com",
	projectId: "crwn-db-fbee8",
	storageBucket: "crwn-db-fbee8.appspot.com",
	messagingSenderId: "1010796874722",
	appId: "1:1010796874722:web:981ab45d4413393273c7bb",
	measurementId: "G-R76F0D4ST5",
}; */
const config = {
	apiKey: "AIzaSyCnxnKGyGRcpOpNI4DaNrYJCTWJhpNapAA",
	authDomain: "siddhdb-6aa7a.firebaseapp.com",
	projectId: "siddhdb-6aa7a",
	storageBucket: "siddhdb-6aa7a.appspot.com",
	messagingSenderId: "507768835225",
	appId: "1:507768835225:web:289acdeb549e2a66a0fc08",
	measurementId: "G-RJXLMYNG0Z",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	//console.log("user Auth only at the time of function run", userAuth);
	if (!userAuth) return;
	//console.log("user Auth info", userAuth.uid);
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	//console.log("User Ref Info", userRef);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, userType = "Guest", email } = userAuth;
		//console.log("Display Name ", displayName);
		//console.log("User Type ", userType);
		//console.log("email ", email);
		const createdAt = new Date();

		var role = ["user"];

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				role,
				userType,
				...additionalData,
			});
		} catch (error) {
			console.log("error creting user1", error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
	userType: "Hospital",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
