const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async (event) => {
  try {
    const { players, scores, date, handWins } = JSON.parse(event.body);
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const all_players = await client.query(q.Paginate(q.Match(q.Index('all_players'))));

    console.log('All players: ', JSON.stringify(all_players));

    const response = await client.query(
      q.Create(
        q.Collection('Games'),
        {
          data: {
           players,
           scores,
           date,
           handWins
          },
        },
      )
    )
    console.log('Created new game');
    return {
      statusCode: 201,
      body: JSON.stringify({...response, message: `Successfully created new game`}),
    };
  } catch (error) {
    console.error(error.toString());
    return { statusCode: 500, body: JSON.stringify({ message: error.toString() })};
  }
};