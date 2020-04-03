import { useReducer, useEffect } from 'react';
import Client from '../../utils/HTTPClient';

const initialState = {
  data: '',
  isLoading: false,
  error: {
    status: '',
    message: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, isLoading: false };
    case 'FETCHING':
      return { ...state, isLoading: true };
    case 'ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      console.error('USE FETCH ERROR');
  }
};

const useFetch = (endpoint, method, body) => {
  const [state, dispatch] = useReducer(initialState, reducer);
  let isMounted = true;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      const resp = await Client.request(endpoint, method, body);
      if (resp.error) {
        dispatch({ type: 'ERROR', payload: resp });
      } else if (isMounted) {
        dispatch({ type: 'SET_DATA', payload: resp.data });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, method, body]);

  return { data: state.data, error: state.error };
};

export default useFetch;
