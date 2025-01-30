import React, { useEffect, useState } from 'react'
import axios from 'axios';
function useFetch() {
  const [quiz, setQuiz] = useState([]);
   const [loading, setLoading] = useState(true);
  
    const getQuiz =  async () =>{
      
      const apiUrl = import.meta.env.VITE_API_URI
      try{
        const res = await axios.get(`${apiUrl}/quiz`);
        setTimeout(()=>{
          setQuiz(res.data);
          setLoading(false);
        }, 2000);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    useEffect(()=>{
      getQuiz();
    },[]);

    return {quiz, loading};
}

export default useFetch
