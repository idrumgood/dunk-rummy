import faunadb from 'faunadb';

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  client.query(
    q.Get(q.Ref(q.Collection('players'), '1'))
  )
  .then((ret) => ({
    statusCode: 200,
    body: ret,
  }))
  .catch((err) => console.error(
    'Error: [%s] %s: %s',
    err.name,
    err.message,
    err.errors()[0].description,
  ))
};
