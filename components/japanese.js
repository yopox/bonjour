const iconv = require('iconv')
const xml2js = require('xml2js')
const axios = require('axios')
const config = require('../config/general')

const style = `<style>
    .jap {
        font-family: Noto Sans JP, serif;
    }
    
    .japanese-box {
        border-radius: 10px;
        font-size: 30px;
    }
    
    .japanese-kanji {
        font-size: 250px;
        line-height: 250px;
        text-align: center;
        padding-right: 50px;
    }
    
    .japanese-box + .japanese-box {
        margin-top: 50px;
    }
    
    .japanese-title {
        font-weight: 300;
        font-size: 25px;
        padding-top: 15px;
    }
    
    .japanese-meaning {
        font-weight: 700;
        font-size: 40px;
    }
</style>`

const divider = "&#160;&#160;•&#160;&#160;"

exports.build = async function (options) {
    let html = ''

    for (const level of config.japanese.levels) {
        let rss = await getKanji(level)
        let on = (rss.on.length > 0) ? `<div class="japanese-title">ON</div><div class="japanese-kana">${rss.on.join(divider)}</div>` : ''
        let kun = (rss.kun.length > 0) ? `<div class="japanese-title">KUN</div><div class="japanese-kana">${rss.kun.join(divider)}</div>` : ''
        html += `<div class="japanese-box row align">
                    <div class="japanese-kanji jap">${rss.kanji}</div>
                    <div class="column justify">
                        <div class="japanese-meaning">${rss.meanings.join(divider)}</div>
                        ${on}
                        ${kun}
                    </div>
                </div>`
    }

    return {
        title: 'japanese',
        html: `${style}<div class="column justify align">${html}</div>`,
    }
}

async function getKanji(level) {
    let rss = await axios.request({
        method: 'GET',
        url: `http://feeds.feedburner.com/Kanji-a-dayLevel${level}.rss`,
        responseType: "arraybuffer",
        responseEncoding: 'binary'
    })

    let t = new iconv.Iconv('EUC-JP', 'UTF-8')
    let feed = t.convert(rss.data, "EUC-JP").toString()
    let items = await xml2js.parseStringPromise(feed)

    let matches = items.rss.channel[0].item[0].description[0].matchAll(
        /on readings:(?: (.*?)(?=[ <]))<br>kun readings:(?: (.*?)(?=[ <]))<br>meaning\(s\): (.*);/gm
    ).next().value

    return {
        kanji: items.rss.channel[0].item[0].title[0],
        on: matches[1].split(" ").filter(e => e),
        kun: matches[2].split(" ").filter(e => e),
        meanings: matches[3].split("; ").filter(e => e),
    }
}