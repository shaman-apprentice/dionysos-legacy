export const getAzureCredentials = (username: string, pw: string) =>
  fetch('https://dionysos-waiter.azurewebsites.net/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ username, pw }),
  });
