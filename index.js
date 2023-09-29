// index.js
const Mustache = require('mustache');
const { Align, getMarkdownTable } = require('markdown-table-ts');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const EXPORT_FILE = "Nachos.md"

const USERS = require('./members')
/**
 * USERS is an array of objects that contains all
 * the data to be provided to Mustache
 */

const LEADERSHIP = USERS.filter(user => {
	return user.leadership
});


/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */

function generateReadMe() {
	let full_output = "#Blacktocats <br> >>>>>>>>> <br>"
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err;

		full_output += ' <br> ## Leaders <br>'
		//Displays Leaders in Blacktocats
		LEADERSHIP.forEach((user) => {
			full_output += Mustache.render(data.toString(), user) + "<br>";
			//My name is Roscoe I currently work at GitHub as a Software Engineer >> blacktocat([@rrconey](https://github.com/rrconey))
		});

		full_output += ' <br> ## Members <br> >>>>>>>>> <br>'

		//Displays all Members in Blacktocats
		USERS.forEach((user) => {
			full_output += Mustache.render(data.toString(), user) + "<br>";
			//My name is Roscoe I currently work at GitHub as a Software Engineer >> blacktocat([@rrconey](https://github.com/rrconey))
		});

    var len = USERS.length, output = [];
    for(var i = 0; i < len; i++){
      output.push([USERS[i].handle, USERS[i].title])
    }

    const table = getMarkdownTable({
      table: {
        head: ['Handle', 'Area of Responsibility'],
        body: output,
      },
      alignment: [Align.Left, Align.Right],
    });

    let obj = {first: 1,
            second: 2
    }.toString()

		fs.writeFileSync(EXPORT_FILE, table);


	});
}

generateReadMe();