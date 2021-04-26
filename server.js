// File: server.js
// Written by Rutuparn Pawar (InputBlackBoxOutput)

const diceware = require("./diceware.js");
const express = require('express');
const cors = require("cors")

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  "origin": "*",
  "methods": "GET",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}

app.use(cors(corsOptions));

app.get("/", (req, res)=>{
	res.redirect('/madlibs-diceware');
})

app.get("/eff-diceware", (req, res)=> {
	const nwords = req.query.nwords;

	if(nwords == undefined)
		res.send(diceware.effDiceware());
	else {
		if(nwords < 4 || nwords > 7)
			res.status(422).send({error: 'Invalid number of words'});
		else
			res.send(diceware.effDiceware(nwords));
	}
		
});

app.get("/madlibs-diceware", (req, res)=> {
	const nphrase = req.query.nphrase;

	if(nphrase == undefined)
		res.send(diceware.madDiceware());
	else {
		if(nphrase != 1 && nphrase != 2)
			res.status(422).send({error: 'Invalid number of phrases'});		
		else
			res.send(diceware.madDiceware(nphrase));
				
	}
})

app.get("*", (req, res)=>{
	res.status(404).send({error: 'Invalid route', redirect: '/madlibs-diceware'})
})

app.listen(port, () =>
  console.log(`Listening on port ${port}!`),
);

// EOF