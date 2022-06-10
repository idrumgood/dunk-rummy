const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async (event) => {
  try {
    const { name } = JSON.parse(event.body);
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });
    const response = await client.query(
      q.Create(
        q.Collection('Players'),
        {
          data: {
           name,
          },
        },
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler }
