import React from "react";
import FormInput from "../../component/form-input/form-input.component";
import { Link } from "react-router-dom";
import CustomButton from "../../component/custom-button/custom-button.component";
import { firestore } from "../../firebase/firebase.utils";

const initialState = {
	Editid: "",

	DoctorCode: "",
	DoctorName: "",
	DoctorSpecialization: "",
	DoctorContact: "",
	DoctorEmail: "",
	DoctorAccount: "",
	DoctorBank: "",
	DoctorIFSC: "",
	DoctorPAN: "",

	mydata: [],
	fillStatus: 1,
	uploadstatus: 0,
};
class DoctorMaster extends React.Component {
	constructor(props) {
		super(props);
		this.onDataChange = this.onDataChange.bind(this);
		this.state = initialState;
		this.unsubscribe = undefined;
	}
	componentWillUpdate() {
		if (this.state.fillStatus === 1) {
			var getidArray = window.location.href.split("/");
			const getIDData = getidArray[getidArray.length - 1];
			const dbRef = firestore.doc(
				`receptionData/doctorMaster/doctor/${getIDData}`,
			);

			dbRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						const newData = doc.data();
						this.setState({
							Editid: getIDData,
							DoctorName: newData.DoctorName,
							DoctorSpecialization: newData.DoctorSpecialization,
							DoctorContact: newData.DoctorContact,
							DoctorEmail: newData.DoctorEmail,

							fillStatus: 2,
						});
					} else {
						// doc.data() will be undefined in this case
						console.log("No such document!");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		}
	}
	componentDidMount() {
		const db = firestore
			.collection("receptionData")
			.doc("doctorMaster")
			.collection("doctor");

		this.unsubscribe = db
			.orderBy("DoctorName", "asc")
			.onSnapshot(this.onDataChange);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onDataChange(items) {
		let mydata = [];

		items.forEach((item) => {
			let id = item.id;
			let data = item.data();
			mydata.push({
				id: id,

				DoctorName: data.DoctorName,
				DoctorEmail: data.DoctorEmail,
				DoctorSpecialization: data.DoctorSpecialization,
				DoctorContact: data.DoctorContact,
			});
		});

		this.setState({
			mydata: mydata,
		});
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		let sData = {
			DoctorName: this.state.DoctorName,
			DoctorSpecialization: this.state.DoctorSpecialization,
			DoctorContact: this.state.DoctorContact,
			DoctorEmail: this.state.DoctorEmail,
		};
		const db = firestore
			.collection("receptionData")
			.doc("doctorMaster")
			.collection("doctor");
		if (!this.state.Editid) {
			db.add(sData)
				.then(() => {
					alert("Created new Doctor successfully!");
					this.setState(initialState);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			db.doc(this.state.Editid)
				.then(() => {
					alert("Doctor Update successfully!");
					this.setState(initialState);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
		this.setState({ fillStatus: 2 });
	};

	render() {
		const {
			DoctorName,
			DoctorSpecialization,
			DoctorContact,
			DoctorEmail,

			mydata,
		} = this.state;

		return (
			<div className="form-container">
				<form onSubmit={this.handleSubmit}>
					<h2 className="section-title">Doctor Master form</h2>

					<div className="image-form-page">
						<div className="tab-container">
							<FormInput
								type="text"
								name="DoctorName"
								value={DoctorName || ""}
								onChange={this.handleChange}
								label="Doctor Name"
								required
							/>

							<FormInput
								type="text"
								name="DoctorSpecialization"
								value={DoctorSpecialization || ""}
								onChange={this.handleChange}
								label="Doctor Specialization"
								required
							/>

							<FormInput
								type="text"
								name="DoctorContact"
								value={DoctorContact || ""}
								onChange={this.handleChange}
								label="Doctor Contact"
								required
							/>
							<FormInput
								type="email"
								name="DoctorEmail"
								value={DoctorEmail || ""}
								onChange={this.handleChange}
								label="Email Address"
								required
							/>
						</div>
					</div>
					<CustomButton type="submit" sizefix>
						SUBMIT
					</CustomButton>
				</form>

				<h2 className="section-title">Doctor List</h2>

				<table className="table-page">
					<thead>
						<tr className="table-header">
							<th className="th1">Doctor Code</th>

							<th className="th3">Doctor Name</th>
							<th className="th4">Email</th>

							<th className="th6">Specialization</th>
							<th className="th7">Contact</th>
							<th className="th8">Action</th>
						</tr>
					</thead>
					<tbody>
						{mydata.map((item) => (
							<tr className="table-data-row">
								<td className="emp-code">{item.DoctorCode}</td>

								<td>{item.DoctorName}</td>
								<td>{item.DoctorEmail}</td>

								<td>{item.DoctorSpecialization}</td>
								<td>{item.DoctorContact}</td>
								<td>
									<button className="btn btn-view">View</button>

									<Link to={`/reception/doctormaster/${item.id}`}>
										<button className="btn btn-edit">Edit</button>
									</Link>

									<button className="btn btn-delete">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default DoctorMaster;
