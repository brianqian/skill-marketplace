export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined;

export type ActionType = {
  type: string;
  payload?: any;
  body?: any;
  endpoint?: string;
};

export type StateType = {
  data?: any;
  error?: string;
  endpoint?: string;
  method?: FetchMethod;
  body?: any;
  isLoading: boolean;
};

export type AjaxParam = {
  body?: any;
};
