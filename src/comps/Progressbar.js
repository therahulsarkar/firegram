import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage' 
import { motion } from 'framer-motion'

function Progressbar({ file, setFile }) {

    const { url, progress } = useStorage(file);
    console.log(url);

    //? We remove the progress bar when we get the url because it means that our file is uploaded 
    useEffect(()=>{
        if(url){
           setFile(null) 
        }
    }, [url, setFile])
    
    return (
        <motion.div className="progress-bar"
         initial={{ width: 0 }}
         animate={{ width: progress + '% ' }}
         >
        </motion.div>
    )
}

export default Progressbar
