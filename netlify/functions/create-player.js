const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async (event) => {
  try {
    const { name } = JSON.parse(event.body);
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const all_players = await client.query(q.Paginate(q.Match(q.Index('all_player_names'))));

    console.log('All players: ', JSON.stringify(all_players));

    if (all_players.data.includes(name)) {
      console.log(`Player name ${name} alredy exists`);
      return {
        statusCode: 200,
        body: 'Player already exists. Please try a different name.'
      }
    }

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
    console.log('Created new player ', name);
    return {
      statusCode: 201,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler }
