// File: diceware.js
// Written by Rutuparn Pawar (InputBlackBoxOutput)

// Resources
// Wordlist parts of speech in english: http://www.ashley-bovan.co.uk/words/partsofspeech.html
// Entropy calculated using formula at https://www.pleacher.com/mp/mlessons/algebra/entropy.html

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname, "assets", "wordlist", "worldlist_madlibs.json"), "utf-8", (err, data) => {
	if (err)
		throw err;
	else {
		wordlistMadlibs = JSON.parse(data);
		module.exports.wordlistMadlibs = wordlistMadlibs;
	}

	// console.log(`# of adverbs: ${wordlistMadlibs.adverbs.length}`);
	// console.log(`# of adjectives: ${wordlistMadlibs.adjectives.length}`);
	// console.log(`# of nouns: ${wordlistMadlibs.nouns.length}`);
})

fs.readFile(path.join(__dirname, "assets", "wordlist", "worldlist_eff.json"), "utf-8", (err, data) => {
	if (err)
		throw err;
	else {
		wordlistEFF = JSON.parse(data);
		module.exports.wordlistEFF = wordlistEFF;
	}
})

function effDiceware(nWords = 5) {
	words = [];
	password = "";

	for (let i = 0; i < nWords; i++) {
		rolls = "";
		for (let i = 0; i < 5; i++) {
			rolls += (crypto.randomInt(1, 6 + 1));
		}

		words.push([wordlistEFF[rolls], rolls]);
		password += wordlistEFF[rolls]

		if (i != nWords - 1)
			password += ' ';
	}

	// Password statistics
	entropy = (password.length - (nWords - 1)) * Math.log2(26);
	entropy = entropy.toFixed(2);
	possible_combinations = Math.pow(7776, nWords);
	crack_time = timeToCrack(possible_combinations);

	return { words, password, entropy, possible_combinations, crack_time };
	// return { password };
}

module.exports.effDiceware = effDiceware;

function madDiceware(nPhrases = 2) {
	password = "";
	r = [];
	for (let i = 0; i < 6; i++)
		r.push(crypto.randomInt(0, 1297));

	adv1 = wordlistMadlibs.adverbs[r[0]];
	adj1 = wordlistMadlibs.adjectives[r[1]];
	noun1 = wordlistMadlibs.nouns[r[2]];

	adv2 = wordlistMadlibs.adverbs[r[3]];
	adj2 = wordlistMadlibs.adjectives[r[4]]
	noun2 = wordlistMadlibs.nouns[r[5]]

	words = [adv1, adj1, noun1, adv2, adj2, noun2];

	if (nPhrases == 1)
		password = `A ${words[0]} ${words[1]} ${words[2]}`;
	else if (nPhrases == 2)
		password = `A ${words[0]} ${words[1]} ${words[2]} and a ${words[3]} ${words[4]} ${words[5]}`;
	else
		throw "Number of phrases can be either 1 or 2";

	// Password statistics
	// Substracting 9 from password lenght to remove redundant parts like spaces

	len = nPhrases == 1 ? password.length - 4 : password.length - 13;
	entropy = len * Math.log2(26);
	entropy = entropy.toFixed(2);

	possible_combinations = Math.pow(1296, nPhrases * 3);
	crack_time = timeToCrack(possible_combinations);

	return { words, password, entropy, possible_combinations, crack_time };
	// return { password };
}

module.exports.madDiceware = madDiceware;

function timeToCrack(possibleCombinations) {
	const guessesPerSec = 10000000000;

	seconds = possibleCombinations / guessesPerSec;
	minutes = (seconds / 60);
	hours = (minutes / 60);
	days = (hours / 24);
	weeks = Math.round(days / 7);
	months = Math.round(days / 30);
	years = Math.round(days / 365);

	return { seconds, minutes, hours, days, weeks, months, years };

}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EOF