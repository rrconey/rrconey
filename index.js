// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const USERS = require('./users')

const EXPORT_FILE = "Nachos.md"

/**
  * USERS is an array of objects that contains all
  * the data to be provided to Mustache
*/
let DATA = USERS

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */

function generateReadMe() {
    let full_output = ""
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
      if (err) throw err;
      USERS.forEach((user) => {
        full_output += Mustache.render(data.toString(), user) + "<br>";  
        //My name is Roscoe I currently work at GitHub as a Software Engineer >> blacktocat([@rrconey](https://github.com/rrconey))
      });
      fs.writeFileSync(EXPORT_FILE, full_output);
    });
  }

generateReadMe();