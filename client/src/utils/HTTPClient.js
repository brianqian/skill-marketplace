const Client = {
  request: async (endpoint, method = 'GET', body) => {
    const resp = await fetch(endpoint, {
      method,
      headers: {
        'Content-type': 'application/json',
        body: JSON.stringify(body),
      },
    });
    if (resp.status !== 200) {
      return { status: resp.status, message: resp.message };
    }

    const data = await resp.json();
    return { data };
  },
};

export default Client;
