const Client = {
  request: async (endpoint, method = 'POST', body) => { // call for POST/PUT/PATCH
    const token = localStorage.getItem('token');
    const auth = `Bearer: ${token}`;
    const headers = {
      Authorization: auth,
    };

    headers['Content-Type'] = 'application/json';
    const resp = await fetch(endpoint, { 'method': method, 'headers': headers, 'body': JSON.stringify(body)});
    return resp;
  },
  request_no_body: async (endpoint, method = 'GET') => { // call for GET/DELETE
    const token = localStorage.getItem('token');
    const auth = `Bearer: ${token}`;
    const headers = {
      Authorization: auth,
    };
    const resp = await fetch(endpoint, { method, headers});
    return resp;
  },
};
export default Client;