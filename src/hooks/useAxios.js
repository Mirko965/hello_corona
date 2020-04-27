import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const useAxios = (url) => {
  const [state, setState] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(url);
      const data = await res.data;
      setState({ ...state, ...data });
    } catch (error) {
      setState({ ...state, error: error.toJSON().message });
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  }, [url])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state];
}

export default useAxios


/*
export default function useFetch(baseURL) {
  const [state, setState] = useState({});

  const fetch = useCallback(
    async path => {
      setState({ loading: true });
      try {
        const data = await fetchJSON(baseURL + path);
        setState({ ...state, data, error: undefined });
      } catch (error) {
        setState({ ...state, error });
      } finally {
        setState(state => ({ ...state, loading: false }));
      }
    },
    [baseURL, state]
  );

  return [state, fetch];
} */
