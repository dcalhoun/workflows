import faunadb from "faunadb";

const KEY = process.env.FAUNA_ADMIN_KEY;

if (!KEY) {
  throw new Error('Missing "FAUNA_ADMIN_KEY" environment variable.');
}

const client = new faunadb.Client({
  secret: KEY,
  domain: "db.fauna.com",
  port: 443,
  scheme: "https",
});

export const q = faunadb.query;

export default client;
