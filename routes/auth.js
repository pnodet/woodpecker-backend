const crypto = require('crypto');
const fetch = require('node-fetch');

const express = require('express');
const {Router} = express;
const router = Router();

// const clientId = 'example-backend';

// LOGIN
const base64URLEncode = str => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest();
const createVerifier = () => base64URLEncode(crypto.randomBytes(32));
const createChallenge = verifier => base64URLEncode(sha256(verifier));

router.get('/login', async (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.baseUrl;
  const verifier = createVerifier();
  const challenge = createChallenge(verifier);
  req.session.codeVerifier = verifier;
  res.redirect(
    'https://lichess.org/oauth?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: `${url}/callback`,
        scope: 'preference:read',
        code_challenge_method: 'S256',
        code_challenge: challenge,
      })
  );
});

// CALLBACK
const getLichessToken = async (authCode, verifier, url) =>
  await fetch('https://lichess.org/api/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      grant_type: 'authorization_code',
      redirect_uri: `${url}/callback`,
      client_id: clientId,
      code: authCode,
      code_verifier: verifier,
    }),
  }).then(res => res.json());

const getLichessUser = async accessToken =>
  await fetch('https://lichess.org/api/account', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json());

router.get('/callback', async (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.baseUrl;
  const verifier = req.session.codeVerifier;
  const lichessToken = await getLichessToken(req.query.code, verifier, url);

  if (!lichessToken.access_token) {
    res.send('Failed getting token');
    return;
  }

  const lichessUser = await getLichessUser(lichessToken.access_token);
  res.send(`Logged in as ${lichessUser.username}`);
});

module.exports = router;
