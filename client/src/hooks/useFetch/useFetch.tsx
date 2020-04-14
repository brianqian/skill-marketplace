import { useReducer, useEffect } from 'react';
import Client from '../../utils/HTTPClient';
import { ActionType, StateType, AjaxParam } from './types';

const initialState: StateType = {
  data: '',
  error: undefined,
  endpoint: '',
  method: '',
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
      console.error('USE FETCH ERROR');
  }
};

const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading, error, endpoint, method, body } = state;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!endpoint) return;
      console.log('fetching...');
      dispatch({ type: 'FETCHING' });
<<<<<<< HEAD
      let resp;
      if (!body) {
        resp = await Client.request_no_body(endpoint, method);
      }
      else
      {
        resp = await Client.request(endpoint, method, body);
      }
      if (resp.error) {
=======
      const resp = await Client.request(endpoint, method, body);
      console.log('resp2', resp);
      if (resp?.error?.status && isMounted) {
>>>>>>> WIP
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

  const get = async ({ url, token }: AjaxParam) => {
    dispatch({ type: 'GET_ENDPOINT', url, token });
  };
  const post = async ({ url, body, token }: AjaxParam) => {
    dispatch({ type: 'POST_ENDPOINT', url, body, token });
  };
  const put = async ({ url, body, token }: AjaxParam) => {
    dispatch({ type: 'PUT_ENDPOINT', url, body, token });
  };

  const del = async ({ url, body, token }: AjaxParam) => {
    dispatch({ type: 'DELETE_ENDPOINT', url, body, token });
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
