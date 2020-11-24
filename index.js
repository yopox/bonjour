const pp = require("pdf-puppeteer");
const fs = require('fs')

const options = {width: 1404, height: 1872};
const save = function(pdf) {
    fs.writeFile("test.pdf", pdf, function (){})
    console.log("PDF created.")
}

pp("<h1>bonjour</h1>", save, options)
