const { hasUser } = require('../shared-code/table-storage');

module.exports = async function (context, req) {
  if (!req.body || !req.body.username || ! req.body.pw) {
    context.res = {
      status: 400,
      body: 'Please pass a "username" and a "pw" in the request body.'
    };
    return;
  }

  const isValidUser = await hasUser(req.body.username, req.body.pw);
  if (isValidUser)
    context.res = {
      contentType: 'application/json',
      body: { accesskey: process.env.accesskey }
    };
  else
    context.res = {
      status: 403,
      body: 'Invalid combination of username and password.'
    };
}
