const {Router} = require('express');
const oauth = require('simple-oauth2');
const fetch = require('node-fetch');
const config = require('../config.js');

const router = Router();

/* --- Fill in your app config here --- */
const client = new oauth.AuthorizationCode({
  client: {
    id: config.auth.LICHESS_CLIENT_ID,
    secret: config.auth.LICHESS_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://oauth.lichess.org',
    authorizePath: '/oauth/authorize',
    tokenPath: '/oauth',
  },
  http: {
    json: true,
  },
});

const redirectUri = `http://api.chesspecker.com/auth/callback`;
const authorizationUri = client.authorizeURL({
  redirect_uri: redirectUri,
  scope: ['preference:read'], // see https://lichess.org/api#section/Introduction/Rate-limiting
  state: Math.random().toString(36).substring(2),
});

router.get('/', (_, res) => {
  res.redirect(authorizationUri);
});

router.get('/callback', async (req, res) => {
  const token = await client.getToken({
    code: req.query.code,
    redirect_uri: redirectUri,
  });
  const user = await fetch('https://lichess.org/api/account', {
    headers: {
      Authorization: `Bearer ${token.token.access_token}`,
    },
  }).then(res => res.json());
  res.send(
    `<h1>Success!</h1>Your lichess user info: <pre>${JSON.stringify(
      user
    )}</pre>`
  );
});

module.exports = router;
