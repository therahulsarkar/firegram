import React, {useState} from 'react';
import Progressbar from './Progressbar';

const UploadForm = () => {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);

	//Array of the file types that can be uploaded
	const allowedTypes = ['image/png', 'image/jpeg'];

	//Todo Function to handle file
	const handleChange = (e) => {
		let selectedFile = e.target.files[0]; //Selecting the first file

		// If a file is selected & the user uploaded file type is in our allowed file type array
		if (selectedFile && allowedTypes.includes(selectedFile.type)) {
			setFile(selectedFile);
			setError('');
		} else {
			setFile(null);
			setError('Select a png or jpeg image file!');
		}
	};

	return (
		<form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <Progressbar file={file} setFile={setFile} /> }
      </div>
    </form>
	);
};

export default UploadForm;
