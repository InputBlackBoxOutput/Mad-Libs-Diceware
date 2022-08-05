// File: server.js
// Written by Rutuparn Pawar (InputBlackBoxOutput)

const diceware = require("./diceware.js");
const express = require('express');
const cors = require("cors")

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
	"origin": "*",
	"methods": "GET",
	"preflightContinue": false,
	"optionsSuccessStatus": 200
}

app.use(cors(corsOptions));

var MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ff8np.mongodb.net/?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
	res.redirect('/mad-libs-diceware');
})

app.get("/eff-diceware", (req, res) => {
	const nwords = req.query.nwords;

	MongoClient.connect(uri, function (err, db) {
		if (err) throw err;

		var dbo = db.db("Mad-Libs-Diceware");
		dbo.collection("eff-wordlist").find({}).toArray(function (err, result) {
			if (err) throw err;
			db.close();

			wordlist = {};
			result.map(entry => {
				wordlist[entry.index] = entry.word;
			})

			if (nwords == undefined)
				res.send(diceware.effDiceware(wordlistEFF = wordlist, nWords = 6));
			else {
				if (nwords < 4 || nwords > 7)
					res.status(422).send({ error: 'Invalid number of words' });
				else
					res.send(diceware.effDiceware(wordlistEFF = wordlist, nWords = nwords));
			}
		});
	});


});

app.get("/mad-libs-diceware", (req, res) => {
	MongoClient.connect(uri, function (err, db) {
		if (err) throw err;

		var dbo = db.db("Mad-Libs-Diceware");
		dbo.collection("mad-libs-wordlist").find({}).toArray(function (err, result) {
			if (err) throw err;
			db.close();

			wordlist = {
				"adverbs": result[0]["list"],
				"adjectives": result[1]["list"],
				"nouns": result[2]["list"]
			};

			res.send(diceware.madDiceware(wordlistMadlibs = wordlist));

		});
	});
})

app.get("/eff-wordlist", (req, res) => {
	MongoClient.connect(uri, function (err, db) {
		if (err) throw err;

		var dbo = db.db("Mad-Libs-Diceware");
		dbo.collection("eff-wordlist").find({}).toArray(function (err, result) {
			if (err) throw err;
			db.close();

			wordlist = {};
			result.map(entry => {
				wordlist[entry.index] = entry.word;
			})
			res.send(wordlist);
		});
	});
});

app.get("/mad-libs-wordlist", (req, res) => {
	MongoClient.connect(uri, function (err, db) {
		if (err) throw err;

		var dbo = db.db("Mad-Libs-Diceware");
		dbo.collection("mad-libs-wordlist").find({}).toArray(function (err, result) {
			if (err) throw err;
			db.close();

			wordlist = {
				"adverbs": result[0]["list"],
				"adjectives": result[1]["list"],
				"nouns": result[2]["list"]
			};
			res.send(wordlist);
		});
	});
})

app.get("*", (req, res) => {
	res.status(404).send({ error: 'Invalid route', redirect: '/madlibs-diceware' })
})

app.listen(port, () =>
	console.log(`Listening on port ${port}!`),
);

// EOF