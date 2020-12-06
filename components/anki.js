const fs = require('fs')
const config = require('../config/general').anki
const random = require('random')
const seedrandom = require('seedrandom')
const moment = require('moment')

const style = `<style>
    .anki-container {
        font-size: 40px;
        line-height: 60px;
    }
    
    .anki-nb {
        min-width: 100px;
    }
    
    .anki-item {
        padding-bottom: 200px;
        break-inside: avoid;
    }
    
    .anki-answer {
        padding-bottom: 0;
        margin-bottom: 50px;
    }
</style>`

exports.build = async function (options) {
    const deck = config[options.deck]
    const notes = JSON.parse(fs.readFileSync(`config/${deck.deckPath}`, 'utf8')).notes
    const selected = drawNotes(notes, options.n, options.seed ? options.seed : "")

    let html = `<div class="anki-container${options.jap ? ' jap' : ''}">`
    let q = 0
    let offset = options.offset ? options.offset : 0

    for (const note of selected) {
        html += `<div class="anki-item${options.answers ? ' anki-answer' : ''}">`
        q += 1

        for (const sq in deck.questions) {
            let content = options.answers
                ? deck.answers[sq].map(sqi => `<div>${note.fields[sqi]}</div>`).join('')
                : `<div>${note.fields[deck.questions[sq]]}</div>`

            html += `<div class="anki-question row">
                        <div class="anki-nb">${q+offset}.${sq}</div>
                        <div class="anki-question-content">${content}</div>
                    </div>`
        }

        html += `</div>`
    }

    html += `</div>`

    return {
        html: `${style}
                <div class="break-before break-after">
                    <div class="section">${options.deck} test${options.answers ? " answers" : ""}</div>
                    ${html}
                </div>`,
    }
}

function drawNotes(notes, n, seed) {
    random.use(seedrandom(moment().format("DDMMYYYY") + seed))

    let selected = []

    for (let i = 0; i < n; i++) {
        let j = 0
        do {
            j = random.int(0, notes.length - 1)
        } while (selected.includes(j))
        selected.push(j)
    }

    return selected.map(i => notes[i])
}