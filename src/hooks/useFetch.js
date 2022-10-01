import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);

	useEffect(() => {

		const fetchData = async () => {
		  setLoading(true);
		  try{
            const res = await axios.get(url);
            setData(res.data);
		  }catch(err){
             setErr(err);
		  }
		  setLoading(false);
		};
		fetchData();
	}, [url]); //dahil sa url kapag nag search lumalabas agad


	const reFetch = async () => {
	  setLoading(true);
	  try{
        const res = await axios.get(url);
        setData(res.data);
	  }catch(err){
         setErr(err);
	  }
	  setLoading(false);
	};

	return { data, loading, err, reFetch };
};

export default useFetch;