const axios = require("axios")

const CELL_SIZE = 90
const BORDER_SIZE = 4

const style = `<style>

    #sudoku-container {
        padding-top: 100px;
        page-break-inside: avoid;
    }
    
    .sudoku-cell {
        width: ${CELL_SIZE}px;
        height: ${CELL_SIZE}px;
        font-size: 55px;
        text-align: center;
        line-height: 55px;
        font-weight: 400;
        border: ${BORDER_SIZE / 2}px solid black;
    }
    
    .sudoku-square + .sudoku-square {
        border-left: ${BORDER_SIZE}px solid black;
    }
    
    .sudoku-square-row + .sudoku-square-row .sudoku-square {
        border-top: ${BORDER_SIZE}px solid black;
    }
    
    .sudoku-square-row {
        width: 100%;
    }
    
    .sudoku-square-row:nth-child(1) .sudoku-cell-row:nth-child(1) .sudoku-cell {
        border-top: none;
    }
    
    .sudoku-square-row:nth-child(3) .sudoku-cell-row:nth-child(3) .sudoku-cell {
        border-bottom: none;
    }
    
    .sudoku-square-row .sudoku-square:nth-child(1) .sudoku-cell:nth-child(1) {
        border-left: none;
    }
    
    .sudoku-square-row .sudoku-square:nth-child(3) .sudoku-cell:nth-child(3) {
        border-right: none;
    }
    
</style>`

/**
 * Scraps the daily sudoku grids of the NYT.
 * @returns {Promise<{html: string, title: string}>}
 */
exports.build = async function (options) {
    let nyt = await axios.request({
        method: 'GET',
        url: `https://www.nytimes.com/puzzles/sudoku/easy`,
    })

    let gameData = JSON.parse(nyt.data.match(/.*window\.gameData = (.*?)<\/script>.*/)[1])[options.difficulty].puzzle_data.puzzle

    let html = "<div id='sudoku-container'>"
    for (let si = 0; si < 3; si++) {
        html += "<div class='row justify sudoku-square-row'>"
        for (let sj = 0; sj < 3; sj++) {
            html += "<div class='sudoku-square'>"
            for (let ci = 0; ci < 3; ci++) {
                html += "<div class='row sudoku-cell-row'>"
                for (let cj = 0; cj < 3; cj++) {
                    let cellNb = gameData[cj + 3*sj + 9*ci + 27*si]
                    html += `<div class='sudoku-cell mono column justify'>${cellNb === 0 ? "" : cellNb}</div>`
                }
                html += "</div>"
            }
            html += "</div>"
        }
        html += "</div>"
    }
    html += "</div>"

    return {
        html: `${style}
                <div class="no-break">
                    <div class="section">sudoku</div>
                    ${html}
                </div>`
    }

}