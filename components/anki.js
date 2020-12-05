const fs = require('fs')
const config = require('../config/general').anki
const random = require('random')
const seedrandom = require('seedrandom')
const moment = require('moment')

const style = `<style>
    .anki-container {
        font-size: 35px;
        line-height: 55px;
        height: 100%;
    }
    
    .anki-nb {
        min-width: 100px;
    }
    
    .anki-item + .anki-item {
        padding-top: 150px;
    }
    
    .anki-answer + .anki-answer {
        padding-top: 50px !important;
    }
</style>`

exports.build = async function (options) {
    const deck = config[options.deck]
    const notes = JSON.parse(fs.readFileSync(`config/${deck.deckPath}`, 'utf8')).notes
    const selected = drawNotes(notes, deck.n, options.seed ? options.seed : "")

    let html = `<div class="anki-container${options.jap ? ' jap' : ''} column align">`
    let q = 0

    for (const note of selected) {
        html += `<div class="anki-item${options.answers ? ' anki-answer' : ''} column">`
        q += 1

        for (const sq in deck.questions) {
            let content = options.answers
                ? deck.answers[sq].map(sqi => `<div>${note.fields[sqi]}</div>`).join('')
                : `<div>${note.fields[deck.questions[sq]]}</div>`

            html += `<div class="anki-question row">
                        <div class="anki-nb">${q}.${sq}</div>
                        <div class="anki-question-content column">${content}</div>
                    </div>`
        }

        html += `</div>`
    }

    html += `</div>`

    return {
        title: `${options.deck} test${options.answers ? " answers" : ""}`,
        html: `${style}${html}`,
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