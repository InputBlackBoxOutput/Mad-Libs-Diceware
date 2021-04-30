// Fontend script for Diceware
// Written by Rutuparn Pawar (InputBlackBoxOutput)

/////////////////////////////////////////////////////////////////////////////////////////////////
// Base URLs
const baseURL = "https://madlibs-diceware.herokuapp.com";
// const baseURL = "http://localhost:5000"; // Use for testing purposes

/////////////////////////////////////////////////////////////////////////////////////////////////
// Linking to the DOM

// const nPhrasesBtnGroup = document.getElementsByClassName('n-');
const outMadlibs = document.getElementById('out-mad');

// const nWordsBtnGroup = document.getElementsByClassName('n-eff');
const outEFF = document.getElementById('out-eff');

const generate = document.getElementById('generate');
/////////////////////////////////////////////////////////////////////////////////////////////////
// Madlibs-Diceware

// var nPhrases = 2;

// for(let i=0; i<nPhrasesBtnGroup.length; i++)
//     nPhrasesBtnGroup[i].addEventListener('click', ()=>{ nPhrases = nPhrasesBtnGroup[i].innerText });

function madlibsDiceware() {
    axios.get(`${baseURL}/madlibs-diceware`)
    .then(response => {
        if(response.data == undefined)
            outMadlibs.innerText = "Could not get in touch with the server!";
        else
            outMadlibs.innerText = response.data.password;
    })
    .catch(error => {
        console.log(error);
        outMadlibs.innerText = "An error occured!";
    });
}

generate.addEventListener('click', ()=> {
    madlibsDiceware();
    effDiceware();
})

/////////////////////////////////////////////////////////////////////////////////////////////////
// Diceware using EFF wordlist
// var nWords = 5;

// for(let i=0; i<nWordsBtnGroup.length; i++)
//     nWordsBtnGroup[i].addEventListener('click', ()=>{ nWords = nWordsBtnGroup[i].innerText });

function effDiceware() {
    axios.get(`${baseURL}/eff-diceware`)
    .then(response => {
        if(response.data == undefined)
            outEFF.innerText = "Could not get in touch with the server";
        else
            outEFF.innerText = response.data.password;
    })
    .catch(error => {
        console.log(error);
        outEFF.innerText("An error occured!");
    })
}


/////////////////////////////////////////////////////////////////////////////////////////////////