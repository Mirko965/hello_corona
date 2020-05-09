import { useState, useCallback } from 'react'
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
  }, [state, url])
  return [state, fetchData];
}

export default useAxios

