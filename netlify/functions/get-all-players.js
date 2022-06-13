const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async () => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const all_players = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection('Players'))),
      q.Lambda(x => q.Get(x))
    ));

    ;

    return {
      statusCode: 200,
      body: JSON.stringify(all_players.data.map((player) => ({ name: player.data.name, id: player.ref.id }))),
    };
  } catch (error) {
    console.error(error.toString());
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler }