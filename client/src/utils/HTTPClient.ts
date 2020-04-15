type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchOption = {
  method: Method;
  body?: {
    [key: string]: any;
  };
  headers?: Headers;
};

const attachToken = (options: FetchOption, token: string) => {
  const headers = new Headers(options.headers);
  headers.append('authorization', `Bearer ${token}`);
  return { ...options, headers };
};

const attachBody = (options: FetchOption, body: any) => {
  const headers = new Headers(options.headers);
  headers.append('Content-Type', 'application/json');
  return {
    ...options,
    headers,
    body: JSON.stringify(body),
  };
};

const Client = {
  request: async (endpoint: string, method: Method = 'GET', body?: any, token?: string) => {
    // call for POST/PUT/PATCH

    let options = { method };
    try {
      if (token) {
        options = attachToken(options, token);
      }
      if (body) {
        options = attachBody(options, body);
      }
      console.log(options);
      const resp = await fetch(endpoint, options);
      console.log('resp1', resp);
      if (resp.status >= 300) {
        const error = { status: resp.status, message: resp.statusText };
        throw Error(JSON.stringify(error));
      }
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
      err.status = err.status || 500;
      err.message = err.message || 'Server error';
      return err;
    }
  },

  // requestNoBody: async (endpoint, method = 'GET') => {
  //   // call for GET/DELETE
  //   const token = localStorage.getItem('token');
  //   const auth = `Bearer: ${token}`;
  //   const headers = {
  //     Authorization: auth,
  //   };
  //   const resp = await fetch(endpoint, { headers });
  //   return resp;
  // },
};
export default Client;
