import { useEffect,useState  } from "react";
const useFetch = (url) => {
    const [data,setData] = useState(null)
    const [isPending,setisPending] = useState(true);
    const [error,setError] = useState(null);
    
    
    useEffect(()=>{
        const abortCont = new AbortController();
        setTimeout(()=>{
            fetch(url , {signal: abortCont.signal})
            .then(res => {
                if(!res.ok){
                    throw Error("Could not fetch the data for the resource");
                }
                console.log(res);
                return res.json();
            })
            .then(data => {
                setData(data);
                setisPending(false);
                setError(null);
            })
            .catch(err =>{
                if(err.name === 'AbortError'){
                    console.log("Fetch Aborted");
                }
                else{
                    setError(err.message);
                    setisPending(false);
                }
                
            });
        },1000);
        return () => abortCont.abort();
        
    },[url]);
    return {data,isPending,error}; 
}

export default useFetch;