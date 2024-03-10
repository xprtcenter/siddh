import React, { useState } from "react";
import "../opd-pages-styles/image-styles.css";
const ImageComponent = () => {
	const [image, setImage] = useState("../../../../assets/avatar.png");
	const uploadSingleFile = (e) => {
		console.log("e from Imagecomponent", e);
		setImage({
			image: URL.createObjectURL(e.target.files[0]),
		});
	};
	let imgPreview;

	imgPreview = <img src={image} alt="" />;

	return (
		<React.Fragment>
			<div className="form-group preview">{imgPreview}</div>
			<input type="file" className="form-control" onChange={uploadSingleFile} />
		</React.Fragment>
	);
};

export default ImageComponent;
