const Client = {
  request: async (endpoint, method = 'POST', body) => { // call for POST/PUT/PATCH
    const token = localStorage.getItem('token');
    const auth = `Bearer: ${token}`;
    const headers = {
      Authorization: auth,
    };

    headers['Content-Type'] = 'application/json';
    const resp = await fetch(endpoint, { method, headers, body});
    console.log(resp.status);
    if (resp.status !== 200 && resp.status !== 201) {
      return { status: resp.status, message: resp.message };
    }
    const data = await resp.json();
    return { data };
  },
  request_no_body: async (endpoint, method = 'GET') => { // call for GET/DELETE
    const token = localStorage.getItem('token');
    const auth = `Bearer: ${token}`;
    const headers = {
      Authorization: auth,
    };
    const resp = await fetch(endpoint, { method, headers});
    console.log(resp.status);
    if (resp.status !== 200) {
      return { status: resp.status, message: resp.message };
    }
    const data = await resp.json();
    return { data };
  },
};
export default Client;