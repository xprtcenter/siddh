import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import "./image-box.styles.scss";
import { storage } from "../../firebase/firebase.utils";

const ImageBox = ({ storageAddress }) => {
	const initialstate = {
		ImagePreviewUrl: "",
		ImageStatus: "Not Upload",
		imageFile: "",
		ImageUrl: "",
	};
	const [data, setData] = useState(initialstate);

	const handleImageUpload = (image) => {
		if (image) {
			const uploadTask = storage
				.ref(`${storageAddress}/${image.name}`)
				.put(image);

			uploadTask.on(
				"state_changes",
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref({ storageAddress })
						.child(image.name)
						.getDownloadURL()
						.then((url) => {
							console.log(url);
							setData({
								...data,
								ImageUrl: url,
								ImageStatus: "Upload Successfully",
							});
						});
				},
			);
		} else {
			alert("Please Select Image");
		}
	};

	const handleImage = (e) => {
		e.preventDefault();

		let imageFile = e.target.files[0];

		if (imageFile !== undefined) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setData({
					...data,
					imageFile: imageFile,
					ImagePreviewUrl: reader.result,
				});
			};

			reader.readAsDataURL(imageFile);
		} else {
			setData({ ...data, imageFile: "", ImagePreviewUrl: "", ImageUrl: "" });
			alert("Please select Image");
		}
	};

	const { ImagePreviewUrl, ImageStatus, imageFile } = data;
	return (
		<div className="image-container">
			<div className="imgPreview">
				{ImagePreviewUrl ? (
					<img src={ImagePreviewUrl} alt="img" />
				) : (
					<img src={avatar} alt="img" />
				)}
			</div>
			<div className="status">
				<h4>{ImageStatus}</h4>
			</div>
			<input type="file" onChange={handleImage} />
			<div
				className="button-upload"
				onClick={() => handleImageUpload(imageFile)}
			>
				Upload
			</div>
		</div>
	);
};
export default ImageBox;
