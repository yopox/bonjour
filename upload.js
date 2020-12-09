const {Remarkable, ItemResponse} = require('remarkable-typescript');
const config = require('./config/general').remarkable;
const moment = require('moment');
const fs = require('fs');

(async () => {
    // Init client
    const client = new Remarkable({deviceToken: config.token})
    await client.refreshToken()
    const myPDF = fs.readFileSync(`./output/bonjour-${moment().format("YYYY-MM-DD")}.pdf`)

    // Upload PDF
    const name = `bonjour ${moment().format("DD/MM/YY")}`
    await client.uploadPDF(name, myPDF)
    console.log(`${name} uploaded`)
})();