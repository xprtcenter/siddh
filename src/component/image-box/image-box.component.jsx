import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import "./image-box.styles.scss";
import { storage } from "../../firebase/firebase.utils";

const ImageBox = (storageAddress) => {
	const initialstate = {
		ImgPreviewUrl: "",
		ImgStatus: "Not Upload",
		imgFile: "",
		ImgUrl: "",
	};
	// State to store uploaded file

	// progress
	const [percent, setPercent] = useState(0);
	//Other Data
	const [data, setData] = useState(initialstate);

	const handleImageUpload = (image) => {
		if (!image) {
			alert("Please Select your Image");
		} else {
			const uploadTask = storage
				.ref(`${storageAddress}/${image.name}`)
				.put(image);

			uploadTask.on(
				"state_changes",
				(snapshot) => {
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					var rounded = Math.round(progress * 10) / 10;
					setPercent({ percent: rounded });
				},
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
								ImgFile: image,
								ImgPreviewUrl: url,
								ImgStatus: "Uploaded",
								ImgUrl: url,
							});
						});
				},
			);
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
					ImgFile: imageFile,
					ImgPreviewUrl: reader.result,
				});
			};

			reader.readAsDataURL(imageFile);
		} else {
			setData({
				...data,
				imgFile: "",
				ImgPreviewUrl: "",
				ImgUrl: "",
				ImgStatus: "Not Upload",
			});
			alert("Please select Image");
		}
	};

	const { ImgPreviewUrl, ImgStatus, ImgFile } = data;
	return (
		<div className="image-container">
			<div className="imgPreview">
				{ImgPreviewUrl ? (
					<img src={ImgPreviewUrl} alt="img" />
				) : (
					<img src={avatar} alt="img" />
				)}
			</div>
			<div className="status">
				<h4>{ImgStatus}</h4>
			</div>
			<input type="file" onChange={handleImage} />
			<div className="button-upload" onClick={() => handleImageUpload(ImgFile)}>
				Upload <p>{percent} "% done"</p>
			</div>
		</div>
	);
};
export default ImageBox;
