export type ActionType = {
  type:
    | 'GET_ENDPOINT'
    | 'POST_ENDPOINT'
    | 'PUT_ENDPOINT'
    | 'DELETE_ENDPOINT'
    | 'SET_DATA'
    | 'FETCHING'
    | 'ERROR';
  payload?: any;
  body?: any;
  endpoint: string;
};

export type StateType = {
  data: any;
  error?: string;
  endpoint?: string;
  method?: string;
  body: any;
  isLoading: boolean;
};

export type AjaxParam = {
  url: string;
  token?: string;
  body?: any;
};
