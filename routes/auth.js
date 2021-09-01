/* eslint-disable camelcase */
import {createHash, randomBytes} from 'node:crypto';
import fetch from 'node-fetch';
import {Router} from 'express';
import {auth} from '../config.js';

const router = new Router();

const clientId = auth.LICHESS_CLIENT_ID;

// LOGIN
const base64URLEncode = (string_) =>
	string_
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');

const sha256 = (buffer) => createHash('sha256').update(buffer).digest();
const createVerifier = () => base64URLEncode(randomBytes(32));
const createChallenge = (verifier) => base64URLEncode(sha256(verifier));

router.get('/login', async (request, response) => {
	const url = request.protocol + '://' + request.get('host') + request.baseUrl;
	const verifier = createVerifier();
	const challenge = createChallenge(verifier);
	request.session.codeVerifier = verifier;
	response.redirect(
		'https://lichess.org/oauth?' +
			new URLSearchParams({
				response_type: 'code',
				client_id: clientId,
				redirect_uri: `${url}/callback`,
				scope: 'preference:read',
				code_challenge_method: 'S256',
				code_challenge: challenge,
			}),
	);
});

// CALLBACK
const getLichessToken = async (authCode, verifier, url) =>
	fetch('https://lichess.org/api/token', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			grant_type: 'authorization_code',
			redirect_uri: `${url}/callback`,
			client_id: clientId,
			code: authCode,
			code_verifier: verifier,
		}),
	}).then((response) => response.json());

const getLichessUser = async (accessToken) =>
	fetch('https://lichess.org/api/account', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then((response) => response.json());

router.get('/callback', async (request, response) => {
	const url = request.protocol + '://' + request.get('host') + request.baseUrl;
	const verifier = request.session.codeVerifier;
	const lichessToken = await getLichessToken(request.query.code, verifier, url);

	if (!lichessToken.access_token) {
		response.send('Failed getting token');
		return;
	}

	const lichessUser = await getLichessUser(lichessToken.access_token);
	response.send(`Logged in as ${lichessUser.username}`);
});

export default router;
