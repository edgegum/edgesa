// create an express app
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://edgegum_sa_east:mK8VfFVI9IrOMbl3@edge-sa-east.e3ftd.mongodb.net/sample_mflix?retryWrites=true&w=majority"
//const uri = "mongodb+srv://edgegum_sa_east:pCduin@m0ng0@edge-sa-east.e3ftd.mongodb.net/?retryWrites=true&w=majority/sample_restaurants?retryWrites=true&w=majority"
// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/api/movie", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  
  try {
    await client.connect();

    const database = client.db('sample_mflix');
    const collection = database.collection('movies');
    //const database = client.db('sample_restaurants');
    //const collection = database.collection('restaurants');

    // Query for a movie that has the title 'Back to the Future'
    //const query = { cuisine: "American", poster: { $exists: true } };
    const query = { genres: "Action", poster: { $exists: true } };
    const cursor = await collection.aggregate([
      { $match: query },
      { $sample: { size: 1 } },
      { $project: 
        {
          title: 1,
          fullplot: 1,
          poster: 1
        }
      }
    ]);

    const movie = await cursor.next();

    return res.json(movie);
  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
