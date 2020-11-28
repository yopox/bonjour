const fs = require('fs')
const style = fs.readFileSync('style.css')

const greeter = require("./components/greeter")
const header = require("./components/header")
const section = require("./components/section")
const calendar = require("./components/calendar")
const empty = require("./components/empty")
const japanese = require("./components/japanese")

exports.bonjour = async function () {
    let html = `<html lang="en"><style>${style}</style>`

    html += await frontPage()

    // Page 2
    html += `<div class="page">`
    html += await buildComponent(header)
    html += await buildComponent(japanese)
    html += `</div>`

    return html
}

async function buildComponent(component, options = {}) {
    let result = await component.build(options)
    let html = ""

    if (result.hasOwnProperty("title")) {
        let response = await section.build(result.title)
        html += response.html
    }

    html += result.html
    return html
}

async function frontPage() {
    let html = `<div class="page">`
    html += await buildComponent(header)
    html += await buildComponent(greeter)
    html += await buildComponent(calendar)
    html += await buildComponent(empty, {title: "notes & todos"})
    html += "</div>"
    return html
}