export type ActionType = {
  // type:
  //   | 'GET_ENDPOINT'
  //   | 'POST_ENDPOINT'
  //   | 'PUT_ENDPOINT'
  //   | 'DELETE_ENDPOINT'
  //   | 'SET_DATA'
  //   | 'FETCHING'
  //   | 'ERROR';
  type: string;
  payload?: any;
  body?: any;
  endpoint?: string;
  token?: string;
};

export type StateType = {
  data?: any;
  error?: string;
  endpoint?: string;
  method?: string;
  body?: any;
  isLoading: boolean;
};

export type AjaxParam = {
  token?: string;
  body?: any;
};
