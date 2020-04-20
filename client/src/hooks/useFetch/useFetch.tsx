import { useReducer, useEffect, Reducer } from 'react';
import Client from '../../utils/HTTPClient';
import { ActionType, StateType, AjaxParam } from './types';

const initialState: StateType = {
  data: '',
  error: undefined,
  endpoint: '',
  method: undefined,
  body: '',
  isLoading: false,
};

const reducer = (state: StateType, action: ActionType) => {
  const { type, payload, body, endpoint } = action;
  switch (type) {
    case 'GET_ENDPOINT':
      return { ...state, endpoint, method: 'GET' };
    case 'POST_ENDPOINT':
      return { ...state, body, endpoint, method: 'POST' };
    case 'PUT_ENDPOINT':
      return { ...state, body, endpoint, method: 'PUT' };
    case 'DELETE_ENDPOINT':
      return { ...state, endpoint, method: 'DELETE' };
    case 'SET_DATA':
      return { ...state, data: payload, isLoading: false, endpoint: '' };
    case 'FETCHING':
      return { ...state, isLoading: true };
    case 'ERROR':
      return { ...state, error: payload, isLoading: false, endpoint: '' };
    default:
      return { ...state };
  }
};

// const reducer2 = (state: any, action: any) => {
//   return {state};
// }

// const initialState2: {} = {};

const useFetch = () => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState);
  const { data, isLoading, error, endpoint, method, body } = state;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!endpoint) return;
      console.log('fetching...');
      dispatch({ type: 'FETCHING' });
      const resp = await Client.request(endpoint, method, body);
      console.log('Data received in useFetch: ', resp);
      if (resp?.error?.status && isMounted) {
        dispatch({ type: 'ERROR', payload: resp });
      } else if (isMounted) {
        console.log('resp3data', resp);
        dispatch({ type: 'SET_DATA', payload: resp.data });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, method, body]);

  const get = async (endpoint: string) => {
    dispatch({ type: 'GET_ENDPOINT', endpoint });
  };
  const post = async (endpoint: string, options?: AjaxParam) => {
    const body = options?.body;
    dispatch({ type: 'POST_ENDPOINT', endpoint, body });
  };
  const put = async (endpoint: string, options: AjaxParam) => {
    const body = options?.body;
    dispatch({ type: 'PUT_ENDPOINT', endpoint, body });
  };

  const del = async (endpoint: string, options: AjaxParam) => {
    const body = options?.body;
    dispatch({ type: 'DELETE_ENDPOINT', endpoint, body });
  };

  const fetch = {
    get,
    post,
    put,
    del,
  };

  return { data, error, fetch, isLoading };
};

export default useFetch;
