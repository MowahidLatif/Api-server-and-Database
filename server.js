const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const url = "mongodb+srv://mowahidlatif02:thisisme01@nbadatabase.fc9t1mr.mongodb.net/nbaDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Welcome to the NBA Players API!');
  });  

//   Get all NBA Players in Database. This endpoint retrieves all names of players and data. 
app.get('/nbaPlayers', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('nbaDatabase').collection('nbaPlayers');
    const players = await collection.find({}).toArray();
    res.status(200).json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error connecting to db', err });
  } finally {
    await client.close();
  }
});

// Get a player by name. This endpoint retrieves a player's data given their name.
app.get('/nbaPlayers/:name', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('nbaDatabase').collection('nbaPlayers');
      const player = await collection.findOne({ name: req.params.name });
      if (player) {
        res.status(200).json(player);
      } else {
        res.status(404).json({ message: 'Player not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error connecting to db', err });
    } finally {
      await client.close();
    }
  });

//   Get players with more than a certain number of championships. This endpoint retrieves all players who have won more than a certain number of championships.
  app.get('/nbaPlayers/championships/:num', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('nbaDatabase').collection('nbaPlayers');
      const players = await collection.find({ championships: { $gt: parseInt(req.params.num) } }).toArray();
      res.status(200).json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error connecting to db', err });
    } finally {
      await client.close();
    }
  });

//   Get players with more than a certain number of MVPs. This endpoint retrieves all players who have won more than a certain number of MVP awards. 
  app.get('/nbaPlayers/mvps/:num', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('nbaDatabase').collection('nbaPlayers');
      const players = await collection.find({ MVPs: { $gt: parseInt(req.params.num) } }).toArray();
      res.status(200).json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error connecting to db', err });
    } finally {
      await client.close();
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// const nbaPlayers = [
//     {
//       "name": "Michael Jordan",
//       "championships": 6,
//       "MVPs": 5,
//       "points": 32292,
//       "assists": 5633,
//       "rebounds": 6672
//     },
//     {
//       "name": "LeBron James",
//       "championships": 4,
//       "MVPs": 4,
//       "points": 35367,
//       "assists": 9696,
//       "rebounds": 9751
//     },
//     {
//       "name": "Kareem Abdul-Jabbar",
//       "championships": 6,
//       "MVPs": 6,
//       "points": 38387,
//       "assists": 5660,
//       "rebounds": 17440
//     },
//     {
//       "name": "Magic Johnson",
//       "championships": 5,
//       "MVPs": 3,
//       "points": 17707,
//       "assists": 10141,
//       "rebounds": 6559
//     },
//     {
//       "name": "Wilt Chamberlain",
//       "championships": 2,
//       "MVPs": 4,
//       "points": 31419,
//       "assists": 4643,
//       "rebounds": 23924
//     },
//     {
//       "name": "Larry Bird",
//       "championships": 3,
//       "MVPs": 3,
//       "points": 21791,
//       "assists": 5695,
//       "rebounds": 8974
//     },
//     {
//       "name": "Shaquille O'Neal",
//       "championships": 4,
//       "MVPs": 1,
//       "points": 28596,
//       "assists": 3026,
//       "rebounds": 13099
//     },
//     {
//       "name": "Tim Duncan",
//       "championships": 5,
//       "MVPs": 2,
//       "points": 26496,
//       "assists": 4225,
//       "rebounds": 15091
//     },
//     {
//       "name": "Kobe Bryant",
//       "championships": 5,
//       "MVPs": 1,
//       "points": 33643,
//       "assists": 6306,
//       "rebounds": 7047
//     },
//     {
//       "name": "Bill Russell",
//       "championships": 11,
//       "MVPs": 5,
//       "points": 14522,
//       "assists": 4100,
//       "rebounds": 21620
//     }
//   ]