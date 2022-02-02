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
            if (response.data == undefined)
                outMadlibs.innerText = "The server is angry about something and is not replying!";
            else {
                words = response.data.password.split(' ');
                words[1] = "<b>" + words[1] + '</b>';
                words[2] = "<b>" + words[2] + '</b>';
                words[3] = "<b>" + words[3] + '</b>';
                words[6] = "<b>" + words[6] + '</b>';
                words[7] = "<b>" + words[7] + '</b>';
                words[8] = "<b>" + words[8] + '</b>';

                password = words.join(' ');
                outMadlibs.innerHTML = password;
            }
        })
        .catch(error => {
            console.log(error);
            outMadlibs.innerText = "Something went wrong!";
        });
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Diceware using EFF wordlist
// var nWords = 5;

// for(let i=0; i<nWordsBtnGroup.length; i++)
//     nWordsBtnGroup[i].addEventListener('click', ()=>{ nWords = nWordsBtnGroup[i].innerText });

function effDiceware() {
    axios.get(`${baseURL}/eff-diceware`)
        .then(response => {
            if (response.data == undefined)
                outEFF.innerText = "The server is angry about something and is not replying!";
            else
                outEFF.innerText = response.data.password;
        })
        .catch(error => {
            console.log(error);
            outEFF.innerText = "Something went wrong!";
        })
}


/////////////////////////////////////////////////////////////////////////////////////////////////
generate.addEventListener('click', () => {
    outMadlibs.innerText = ".....";
    outEFF.innerText = ".....";

    madlibsDiceware();
    effDiceware();
})

/////////////////////////////////////////////////////////////////////////////////////////////////