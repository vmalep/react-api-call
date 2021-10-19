//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function UseFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  console.log("start UseFetch");

  useEffect(() => {
      setLoading('loading...')
      setData({});
      setError(null);
      const source = axios.CancelToken.source();
      axios.get(url, { cancelToken: source.token })
      .then(res => {
          console.log("res: " + res);
          setLoading(false);
          //checking for multiple responses for more flexibility 
          //with the url we send in.
          res.data.content && setData(res.data.content);
          res.data.results && setData(res.data.results);
          res.content && setData(res.content);
      })
      .catch(err => {
          setLoading(false)
          setError('An error occurred. Awkward..')
      })
      return () => {
          console.log("source.cancel");
          source.cancel();
      }
  }, [url])

  return { data, loading, error }
}
export default UseFetch;