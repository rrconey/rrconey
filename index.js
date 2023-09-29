// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const USERS = require('./data')

const EXPORT_FILE = "Nachos.md"

/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
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
      DATA.forEach((user) => {
        full_output += Mustache.render(data.toString(), user) + "\n";  
        //My name is Roscoe I currently work at GitHub as a Software Engineer >> blacktocat([@rrconey](https://github.com/rrconey))
      });
      fs.writeFileSync(EXPORT_FILE, full_output);
    });
  }

generateReadMe();