// File: server.js
// Written by Rutuparn Pawar (InputBlackBoxOutput)

const diceware = require("./diceware.js");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

// Fallback to file IO if MongoDB is not available
const fs = require("fs");
const path = require("path");

function wordlistFileIO(filePath) {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "assets", filePath),
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    throw err;
  }
}

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  methods: "GET",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

var MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ff8np.mongodb.net/?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.redirect("/mad-libs-diceware");
});

app.get("/eff-diceware", async (req, res) => {
  const nwords = req.query.nwords;
  let wordlist = {};

  try {
    const client = await MongoClient.connect(uri);
    const dbo = client.db("Mad-Libs-Diceware");
    const result = await dbo.collection("eff-wordlist").find({}).toArray();

    result.forEach((entry) => {
      wordlist[entry.index] = entry.word;
    });

    client.close();
  } catch (err) {
    console.log("MongoDB connection error: Using file IO");
    wordlist = wordlistFileIO("wordlist-eff.json");
  }

  if (nwords == undefined)
    res.send(diceware.effDiceware((wordlistEFF = wordlist), (nWords = 6)));
  else {
    if (nwords < 4 || nwords > 7)
      res.status(422).send({ error: "Invalid number of words" });
    else
      res.send(
        diceware.effDiceware((wordlistEFF = wordlist), (nWords = nwords))
      );
  }
});

app.get("/mad-libs-diceware", async (req, res) => {
  let wordlist = {};

  try {
    const client = await MongoClient.connect(uri);
    const dbo = client.db("Mad-Libs-Diceware");
    const result = await dbo.collection("mad-libs-wordlist").find({}).toArray();

    wordlist = {
      adverbs: result[0]["list"],
      adjectives: result[1]["list"],
      nouns: result[2]["list"],
    };

    client.close();
  } catch (err) {
    console.log("MongoDB connection error: Using file IO");
    const wordlists = wordlistFileIO("wordlist-mad-libs.json");
    wordlist = {
      adverbs: wordlists["adverbs"],
      adjectives: wordlists["adjectives"],
      nouns: wordlists["nouns"],
    };
  }

  res.send(diceware.madLibsDiceware((wordlistMadlibs = wordlist)));
});

app.get("/eff-wordlist", async (req, res) => {
  let wordlist = {};

  try {
    const client = await MongoClient.connect(uri);
    const dbo = client.db("Mad-Libs-Diceware");
    const result = await dbo.collection("eff-wordlist").find({}).toArray();

    result.forEach((entry) => {
      wordlist[entry.index] = entry.word;
    });

    client.close();
  } catch (err) {
    console.log("MongoDB connection error: Using file IO");
    wordlist = wordlistFileIO("wordlist-eff.json");
  }

  res.send(wordlist);
});

app.get("/mad-libs-wordlist", async (req, res) => {
  let wordlist = {};

  try {
    const client = await MongoClient.connect(uri);
    const dbo = client.db("Mad-Libs-Diceware");
    const result = await dbo.collection("mad-libs-wordlist").find({}).toArray();

    wordlist = {
      adverbs: result[0]["list"],
      adjectives: result[1]["list"],
      nouns: result[2]["list"],
    };

    client.close();
  } catch (err) {
    console.log("MongoDB connection error: Using file IO");
    const wordlists = wordlistFileIO("wordlist-mad-libs.json");
    wordlist = {
      adverbs: wordlists["adverbs"],
      adjectives: wordlists["adjectives"],
      nouns: wordlists["nouns"],
    };
  }

  res.send(wordlist);
});

app.get("*", (req, res) => {
  res
    .status(404)
    .send({ error: "Invalid route", redirect: "/mad-libs-diceware" });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
