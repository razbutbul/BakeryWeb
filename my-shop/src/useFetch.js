// Students : Raz Butbul :319083747, Lion Miakshin :315992735
import { useState, useEffect } from "react";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(err => {
                setError(err.message);
            })
    }, [url]);
    return { data, error }
}

export default useFetch;