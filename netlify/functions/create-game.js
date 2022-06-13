const faunadb = require('faunadb');
const q = faunadb.query;
const handler = async (event) => {
  try {
    const { player1, player1Score, player1HandWins, player2, player2Score, player2HandWins } = JSON.parse(event.body);
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const response = await client.query(
      q.Create(
        q.Collection('Games'),
        {
          data: {
            player1, player1Score, player1HandWins, player2, player2Score, player2HandWins
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

module.exports = { handler }