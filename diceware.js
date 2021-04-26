// File: diceware.js
// Written by Rutuparn Pawar (InputBlackBoxOutput)

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname,  "assets", "wordlist", "worldlist_madlibs.json"), "utf-8", (err, data)=> {
    if(err) 
    	throw err;
    else {
        wordlistMadlibs = JSON.parse(data);
        module.exports.wordlistMadlibs = wordlistMadlibs;
    }

	// console.log(`# of adverbs: ${wordlistMadlibs.adverbs.length}`);
	// console.log(`# of adjectives: ${wordlistMadlibs.adjectives.length}`);
	// console.log(`# of nouns: ${wordlistMadlibs.nouns.length}`);
})

fs.readFile(path.join(__dirname,  "assets", "wordlist", "worldlist_eff.json"), "utf-8", (err, data)=> {
    if(err) 
    	throw err;
    else {
        wordlistEFF = JSON.parse(data);
        module.exports.wordlistEFF = wordlistEFF;
    }
})

// Possible combinations with 5 words = 28,430,288,029,929,701,376
function effDiceware(nWords=5) {
	words = [];
	password = "";

	for (let i = 0; i < nWords; i++) {
		rolls = "";
		for (let i = 0; i < 5; i++) {
		  rolls += (crypto.randomInt(1, 6 + 1));
		}

		words.push([wordlistEFF[rolls], rolls]);
		password += wordlistEFF[rolls] + " ";
	}

	// possibleCombinations = Math.pow(7776, nWords);
	// entropy = nWords * Math.round((Math.log(7776)/Math.log(2)) * 100) / 100;
	// timeToCrack = getTimeToCrack(possibleCombinations);

	// return { words, password, possibleCombinations, entropy, timeToCrack };
	return {password};
}

module.exports.effDiceware = effDiceware;

// Possible combinations for one phrase: 3,856,398,336
// Possible combinations for 2 phrases: 14,871,808,125,903,568,896
function madDiceware(nPhrase=2) {
	password = "";
	r = [];
	for (let i = 0; i < 6; i++)
		r.push(crypto.randomInt(1, 1296));

	if(nPhrase == 1)
		password = `A ${wordlistMadlibs.adverbs[r[0]]} ${wordlistMadlibs.adjectives[r[1]]} ${wordlistMadlibs.nouns[r[2]]}`;
	else if(nPhrase == 2) {
		password = `A ${wordlistMadlibs.adverbs[r[0]]} ${wordlistMadlibs.adjectives[r[1]]} ${wordlistMadlibs.nouns[r[2]]}`;
		password += ` and a ${wordlistMadlibs.adverbs[r[3]]} ${wordlistMadlibs.adjectives[r[4]]} ${wordlistMadlibs.nouns[r[5]]}`
	}
	else 
		throw "Number of phrases can be either 1 or 2";
	
	return {password};
}

module.exports.madDiceware = madDiceware;

function getTimeToCrack(possibleCombinations) {
	const guessesPerSec = 1000000000000;
	
	seconds = possibleCombinations/guessesPerSec;
	minutes = (seconds / 60);
	hours = (minutes / 60);
	days = (hours / 24);
	weeks = Math.round(days / 7);
	months = Math.round(days / 30);
	years = Math.round(days / 365);

	return {seconds, minutes, hours, days, weeks, months, years};
    
 }
//////////////////////////////////////////////////////////////////////////////////////////////////////
// EOF