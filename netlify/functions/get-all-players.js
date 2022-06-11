const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async (event) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const all_players = await client.query(q.Paginate(q.Match(q.Index('all_players'))));

    console.log('All players: ', JSON.stringify(all_players));

    return {
      statusCode: 200,
      body: JSON.stringify(all_players),
    };
  } catch (error) {
    console.error(error.toString());
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler }