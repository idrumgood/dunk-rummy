const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async (event) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });
    const response = await client.query(
      q.Create(
        q.Collection('Games'),
        {
          data: {
            players: ['Amber', 'Bryan'],
            points: [112, 97],
            handWins: [3, 6],
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
