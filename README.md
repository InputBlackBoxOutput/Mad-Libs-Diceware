# Madlibs Diceware
Diceware generated passwords that you can easily remember

## Using the API
### API endpoint: https://madlibs-diceware.herokuapp.com/

### Routes:
<dl>
  <dt>GET /</dt>
  <dd>Rerouted to /madlibs-diceware</dd>

  <dt>GET /madlibs-diceware</dt>
  <dd>Generate password using madlibs diceware<br>Use query string parameter <i>nphrase</i> to change number of phrases in the password <br> Accepted number of phrases: 1 or 2</dd>

  <dt>GET /eff-diceware</dt>
  <dd>Generate password using plain diceware<br>Use query string parameter <i>nwords</i> to change number of words in the password <br> Accepted number of words: 4, 5, 6 or 7</dd>

  <dt>GET /madlibs-wordlist</dt>
  <dd>Sends the wordlist used by madlibs diceware as response</dd>

  <dt>GET /eff-wordlist</dt>
  <dd>Sends the wordlist used by plain diceware as response</dd>

</dl>

### Made with lots of ⏱️, 📚 and ☕ by [InputBlackBoxOutput](https://github.com/InputBlackBoxOutput)
