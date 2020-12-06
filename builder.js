const fs = require('fs')
const style = fs.readFileSync('style.css')

const header = require("./components/header")
const greeter = require("./components/greeter")
const empty = require("./components/empty")

exports.bonjour = async function () {
    let html = `<html lang="en"><style>${style}</style>`

    html += (await header.build()).html

    html += `<table><thead><tr><td><div class="page-header-space"></div></td></tr></thead>`
    html += `<tbody><tr><td>`

    // Title page
    html += (await greeter.build()).html
    html += (await empty.build({title: "notes & todos"})).html

    html += `</td></tr></tbody></table>`

    return html
}