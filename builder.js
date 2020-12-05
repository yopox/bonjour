const fs = require('fs')
const style = fs.readFileSync('style.css')

const header = require("./components/header")
const greeter = require("./components/greeter")
const calendar = require("./components/calendar")
const empty = require("./components/empty")
const japanese = require("./components/japanese")
const sudoku = require("./components/sudoku")
const anki = require("./components/anki")

exports.bonjour = async function () {
    let html = `<html lang="en"><style>${style}</style>`

    html += (await header.build()).html

    html += `<table><thead><tr><td><div class="page-header-space"></div></td></tr></thead>`
    html += `<tbody><tr><td>`

    // Title page
    html += (await greeter.build()).html
    html += (await calendar.build()).html
    html += (await empty.build({title: "notes & todos"})).html

    // Anki
    html += (await anki.build({deck: "JP Core 2000", n: 12, answers: false, jap: true})).html
    html += (await anki.build({deck: "JP Core 2000", n: 12, answers: true, jap: true})).html

    html += (await anki.build({deck: "B1 Wortliste", n: 4, answers: false})).html
    html += (await anki.build({deck: "B1 Wortliste", n: 4, answers: true})).html

    // More japanese
    html += (await japanese.build()).html

    // Sudoku
    html += (await sudoku.build({difficulty: "easy"})).html

    html += `</td></tr></tbody></table>`

    return html
}