//! This hook is used to store files in storage & firestore

import React, {useState, useEffect} from 'react';
import {projectStorage, projectFirestore, timestamp} from '../firebase/config';

const useStorage = (file) => {

	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {

		//* Creating a reference to the file name in the firebase storage & firestore
		const storageRef = projectStorage.ref(file.name); //The file will be saved as its name
		const collectionRef = projectFirestore.collection('image'); //Creating a collection in firestore to store image urls 

		//* Uploading file to (store) the reference that we just made
		//storageRef.put(file).on('state_change', (snap)=> {}, (err)=>{}, async ()=>{} )
		storageRef.put(file).on(
			'state_change',

			(snap) => { //Whenever the state changes it triggers the callback function
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100; //Calculating the progress percentage
				setProgress(percentage); //Setting the progress percentage
			},

			
			(err) => { //In case of error this callback function runs
				setError(err);
			},

			async () => { //Another function as argument that fires when the upload completes fully
				
				const url = await storageRef.getDownloadURL(); //Storing the download url of the file generated through getDownloadURL function 

				const createdAt = timestamp(); //Calling the timestamp function  
				collectionRef.add({ url: url, createdAt }) //In the firestore collection we are storing the url & the timestamp 

				setUrl(url); //Updating the state of setUrl hook 
			}
		);
	}, [file]); //Whenever the state of file changes this useEffect hook runs

	return {progress, url, error}; //Returning the states
};

export default useStorage;
