

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: true,
  useFindAndModify: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'user';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';
const MONGO_HOST = process.env.MONGO_URL || `cluster0.menvh.mongodb.net/sample?w=majority`;

const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 3000;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'issuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'secret';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
  }
};

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '70e40fe40ada41351efa';
const GITHUB_SECRET = process.env.GITHUB_SECRET || '';

const GITHUB = {
  id: GITHUB_CLIENT_ID,
  secret: GITHUB_SECRET
}

const CALLBACK = process.env.CALLBACK || 'http://localhost:3000/callback';
const TOKEN = process.env.TOKEN || 'justatoken';
const DEFAULT_LANG = 'ru';

const config = {
  mongo: MONGO,
  github: GITHUB,
  server: SERVER,
  callback: CALLBACK,
  appToken: TOKEN,
  lang: DEFAULT_LANG
};

export default config;
