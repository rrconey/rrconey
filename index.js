// index.js
const Mustache = require('mustache');
const { Align, getMarkdownTable } = require('markdown-table-ts');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const EXPORT_FILE = "Nachos.md"
const BLACKTOCATS = require('./members')

let markdownTable = ""
for(i=0;i<12;i++){
	markdownTable += " | " + BLACKTOCATS[i].handle
	}

markdownTable += "| \n"

for(i=0;i<12;i++){
	markdownTable += " | :---:"
}

markdownTable += "| \n"

for(i=0;i<12;i++){
	let image_handle = `![@${BLACKTOCATS[i].handle}]`
	let image_url = `(https://github.com/${BLACKTOCATS[i].handle}.png)`
	markdownTable += " | " + image_handle + image_url
}



fs.writeFileSync("EXPORT_FILE2.md", markdownTable);

/**
 * BLACKTOCATS is an array of objects that contains all
 * the data to be provided to Mustache
 */

const LEADERSHIP = BLACKTOCATS.filter(user => {
	return user.leadership
});

/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */

function generateReadMe() {
	let full_output = "#Blacktocats <br>" 
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err;

		full_output += ' <br> ## Leaders <br>'
		// //Displays Leaders in Blacktocats
		// LEADERSHIP.forEach((user) => {
		// 	full_output += Mustache.render(data.toString(), user) + "<br>";
		// 	//My name is Roscoe I currently work at GitHub as a Software Engineer >> blacktocat([@rrconey](https://github.com/rrconey))
		// });

		var len = LEADERSHIP.length, leader_output = [], tablx = "";
		for(var i = 0; i < len; i++){
			leader_output.push([LEADERSHIP[i].handle, LEADERSHIP[i].title])
		
		firstRow = "[@aboutthatjazz](https://github.com/aboutthatjazz) | \n"
		secondRow = "--- | \n"
		ThirdRow =  " ![@aboutthatjazz](https://avatars.githubusercontent.com/u/8271635?s=200&u=8c2128804a8425aeadc554c7c56aba40927d075a&v=4) | \n"
		

		combine = (firstRow, secondRow, ThirdRow)

		const leadership_table = getMarkdownTable({
			table: {
			  head: [LEADERSHIP[i].handle],
			  body: leader_output,
			},
			alignment: [Align.Left],
		  });
		tablx = leadership_table
		}
		fs.writeFileSync("EXPORT_FILE.md", combine);

		// full_output += leadership_table
		full_output += ' <br> ## Members <br> >>>>>>>>> <br>'

		//Displays all Members in Blacktocats
		BLACKTOCATS.forEach((user) => {
			full_output += Mustache.render(data.toString(), user) + "<br>";
			//My name is Roscoe I currently work at GitHub as a Software Engineer >> blacktocat([@rrconey](https://github.com/rrconey))
		});
	
    var len = BLACKTOCATS.length, output = [];
    for(var i = 0; i < len; i++){
      output.push([BLACKTOCATS[i].handle, BLACKTOCATS[i].title, BLACKTOCATS[i].hobby])
    }

	fs.writeFileSync(EXPORT_FILE, full_output);

    const table = getMarkdownTable({
      table: {
        head: ['Handle', 'Area of Responsibility', 'Hobby'],
        body: output,
      },
      alignment: [Align.Left, Align.Left, Align.Left],
    });

		// fs.appendFileSync(EXPORT_FILE, "This is the first line<br /><br />");
		// console.log(table)
		// fs.writeFileSync("table.md", table);
	});
}

generateReadMe();
