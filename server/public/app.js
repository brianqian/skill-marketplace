const client = feathers();

client.configure(feathers.rest.fetch(window.fetch));

client.configure(feathers.authentication({
  storage: window.localStorage
}));

async function login1()
{
  console.log(client.service('users').find());
}

function login2()
{
  console.log("user 2");
}


