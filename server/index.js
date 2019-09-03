require("dotenv").config();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const _ = require('lodash');

const Koa = require("koa");
const Router = require("koa-router");
const combineRouters = require("koa-combine-routers");
const logger = require("koa-logger");
const cors = require("kcors");
const bodyParser = require("koa-bodyparser");
const request = require("request");

const PORT = 5000;

const uuid = require("uuid/v4");
const _d = require("datedash");

const _utils = require("./_helpers/_utils");
const _error = _utils._error;
const _log = _utils._log;
const log = _utils._log.log;

const openid_authenticate_req = require("./openid/openid-authenticate").openid_authenticate_req;
const openid_token_req = require("./openid/openid-token").openid_token_req;
const openid_user_info_req = require("./openid/openid-user-info").openid_user_info_req;

const _send_email = require("./_helpers/_send_email");

const app = new Koa();

const loginRoute = new Router();
const openidRedirectRoute = new Router();
const discoveryServiceRoute = new Router();
const registerRoute = new Router();
const ingestRoute = new Router();
const claimsRoute = new Router();
const requestVerificationsRoute = new Router();

/**
 * @param {domain_env} string Domain Environment: pd (is a privacy domain): not_pd (is NOT a privacy domain)
 * */
const domain_env = process.env.DOMAIN_ENV;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

//TODO: Change to person logged in
const issuer_uri = "did:wsutm:issuer:fred_arnold";
const redirect_uri = process.env.URI_REDIRECT;
const scope = process.env.SCOPE;

const jotform_api_key = process.env.JOTFORM_API_KEY;

loginRoute.post("/api/openid-login", async (ctx, next) => {
  const email = ctx.query.email;
  const login_hint = `email:${email}`;
  const auth_params = {
    login_hint: login_hint,
    response_type: "code",
    client_id: client_id,
    redirect_uri: redirect_uri,
    scope: scope,
    state: uuid(),
    nonce: new Date().getTime()
  };
  const auth_url = await openid_authenticate_req(auth_params);
  ctx.body = {
    openid_url: auth_url
  };
  await next();
});

registerRoute.post("/api/register", async (ctx, next) => {
  log.lightCyan("/api/register");
  console.log(ctx.query);

  const _query = ctx.query.email;

  ctx.body = {
    query: _query
  };

  await next();
});

openidRedirectRoute.post("/api/openIdClient/redirect", async (ctx, next) => {
  log.lightYellow("/api/openIdClient/redirect");
  log.lightYellow(ctx.query.code);

  const client_secret_jwt_claims = {
    iss: client_id,
    sub: client_id,
    aud: process.env.URI_TOKEN,
    jti: crypto.randomBytes(20).toString("hex"),
    exp: 900009
  };

  const client_secret_jwt = jwt.sign(client_secret_jwt_claims, client_secret, {
    algorithm: "HS256"
  });

  const params = {
    grant_type: "authorization_code",
    code: ctx.query.code,
    client_id: client_id,
    redirect_uri: redirect_uri,
    client_assertion_type:
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion: client_secret_jwt
  };

  const openid_token = await openid_token_req(params);

  const id_token = openid_token.body.id_token;

  const id_token_options = {
    audience: client_id,
    issuer: issuer_uri,
    algorithms: ["HS256"]
  };

  const id_token_validate = jwt.verify(
    id_token,
    client_secret,
    id_token_options,
    (err, payload) => {
      if (err) {
        return {
          is_valid: false,
          msg: err.message,
          iss: null,
          aud: null
        };
      } else {
        return {
          is_valid: true,
          msg: "id_token_is_valid",
          iss: payload.iss,
          aud: payload.aud
        };
      }
    }
  );

  if (id_token_validate.is_valid) {
    openid_token.body.id_token_validate = id_token_validate;
    const access_token = openid_token.body.access_token;
    const openid_user_info = await openid_user_info_req(access_token);
    ctx.body = {
      openid_token,
      openid_user_info
    };
    await next();
  } else {
    openid_token.body.id_token_validate = id_token_validate;
    ctx.body = {
      openid_token,
      openid_user_info: {}
    };
    await next();
  }
});

discoveryServiceRoute.post("/api/discovery-service", async (ctx, next) => {
  log.yellow("/api/discovery-service");

  const _URI = "https://ds-webshield.resilient-networks.com/v1/graphql";
  const email = ctx.query.email;

  log.red(email);

  const data = await axios.post(
    _URI,
    {
      query: `{
			person(email: "${email}") {
				type
				id
				birthDate
				gender
				identifiers {
					type
					ssn {
							type
							value
							startDate
							endDate
					}
					email {
							type
							value
							startDate
							endDate
					}
					phoneNumber {
							type
							value
							startDate
							endDate
					}
				}
				names {
					type
					fullName
				}
				postalAddresses {
					type
					fullAddress
				}
			}
		}`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  // console.log(data.data)

  ctx.body = {
    user: data.data
  };

  await next();
});

ingestRoute.post("/api/ingest", async (ctx, next) => {
  log.lightMagenta(ctx.body);
  const res_body = ctx.body;
  ctx.body = {
    res_body,
    msg: "Disco!"
  };
  await next();
});

claimsRoute.post("/api/claims", async (ctx, next) => {
  log.lightCyan("/api/claims");

  const _query = ctx.query;

  const issuer = {
    fullName: _query["issuer[fullName]"],
    email: _query["issuer[email]"]
  };

  const claim = _query["claim"];

  const verifier = {
    fullName: _query["verifier[fullName]"],
    // email: _query['verifier[email]']
    email: "flavio.espinoza@gmail.com"
  };

  const emailBody = {
    from: _query["emailBody[from]"],
    subject: _query["emailBody[subject]"],
    text: _query["emailBody[text]"],
    title: _query["emailBody[title]"]
  };

  const send_email = await _send_email(verifier.email, emailBody);

  ctx.body = {
    issuer: issuer,
    claim: claim,
    verifier: verifier,
    emailBody: emailBody,
    send_email: send_email,
    _query: _query
  };

  await next();
});

const _req_claim = async options => {
  return new Promise(async resolve => {
    request(options, async (error, response, body) => {
      if (error) throw new Error(error);
      let _body = JSON.parse(body);
      console.log(_body);
      resolve({
        status_code: response.statusCode,
        response_headers: response.headers,
        body: _body
      });
    });
  });
};

requestVerificationsRoute.post("/api/request-verifications", async (ctx, next) => {
    const submission_id = ctx.query.submission_id;
    const jotform_uri = `https://hipaa-api.jotform.com/submission/${submission_id}`;
    const options = {
      method: "GET",
      url: jotform_uri,
      qs: { apikey: jotform_api_key }
		};
		const claim = await _req_claim(options)
		const answers_all = claim.body.content.answers
		const answers = []
		_.each(answers_all, (obj, key) => {
				if (obj.answer) {
					answers.push(obj)
				}
		})
		ctx.body = {
			claim: {
				submission_id: claim.body.content.id,
				answers: answers,
				answers_all: answers_all	
			}
		}
		await next()
  }
);

const router = combineRouters(
  loginRoute,
  registerRoute,
  openidRedirectRoute,
  discoveryServiceRoute,
  ingestRoute,
  claimsRoute,
  requestVerificationsRoute
);

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(router());

app.listen(PORT, () => _log.blue(`Server listening on port ${PORT}`));
