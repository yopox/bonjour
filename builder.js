const fs = require('fs')
const style = fs.readFileSync('style.css')

const PAGE_OPENING = '<div class="page">'
const PAGE_ENDING = '</div>'

const greeter = require("./components/greeter")
const header = require("./components/header")
const section = require("./components/section")
const calendar = require("./components/calendar")
const empty = require("./components/empty")
const japanese = require("./components/japanese")
const sudoku = require("./components/sudoku")
const anki = require("./components/anki")

exports.bonjour = async function () {
    let html = `<html lang="en"><style>${style}</style>`

    html += await frontPage()

    html += await page([[anki, {deck: "JP Core 2000", answers: false, jap: true}]])
    html += await page([[anki, {deck: "JP Core 2000", answers: true, jap: true}]])

    html += await page([[anki, {deck: "JP Core 2000", seed: "1", answers: false, jap: true}]])
    html += await page([[anki, {deck: "JP Core 2000", seed: "1", answers: true, jap: true}]])

    html += await page([[anki, {deck: "B1 Wortliste", answers: false}]])
    html += await page([[anki, {deck: "B1 Wortliste", answers: true}]])

    html += await page([[japanese, {}]])

    html += await page([[sudoku, {difficulty: "easy"}]])

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
    return page([
        [greeter, {}],
        [calendar, {}],
        [empty, {title: "notes & todos"}],
    ])
}

async function page(components) {
    let html = PAGE_OPENING
    html += await buildComponent(header)

    for (const i in components) {
        html += await buildComponent(components[i][0], components[i][1])
    }

    html += PAGE_ENDING
    return html
}