const attachToken = headers => {
  const token = localStorage.getItem('token');
  return { ...headers, Authorization: `Bearer ${token}` };
};

const attachBody = (options, body) => {
  return {
    ...options,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };
};

const Client = {
  request: async (endpoint, method = 'GET', body, token) => {
    // call for POST/PUT/PATCH
    const headers = {};
    const options = { method };
    try {
      if (token) attachToken(headers);
      if (body) attachBody(options, body);
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
      // const error = JSON.parse(err) || {};
      err.status = err.status || 500;
      err.message = err.message || 'Server error';
      return err;
    }
  },

  requestNoBody: async (endpoint, method = 'GET') => {
    // call for GET/DELETE
    const token = localStorage.getItem('token');
    const auth = `Bearer: ${token}`;
    const headers = {
      Authorization: auth,
    };
    const resp = await fetch(endpoint, { headers });
    return resp;
  },
};
export default Client;
