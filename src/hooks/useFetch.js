import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const baseURL = 'http://localhost:3003';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const doFetch = async () => {
      setLoading(true);

      try {
        const response = await fetch(baseURL + url, { ...options, signal });
        const json = await response.json();
        if (!signal.aborted) {
          setData(json);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    doFetch();
    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
