function login1() {
  fetch('/authentication',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      strategy: 'local',
      email: 'hello@feathersjs.com',
      password: 'supersecret'
    })
  }).then(response => {
    console.log(response);
  });
}

function login2()
{
  console.log("user 2");
}


