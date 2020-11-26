const puppeteer = require("puppeteer")
const fs = require('fs');
const moment = require("moment")

const builder = require("./builder")

// Create output folder
if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

// Puppeteer options
const content_options = {waitUntil: "networkidle0"}
const pdf_options = {
    path: `output/bonjour-${moment().format("YYYY-MM-DD")}.pdf`,
    printBackground: true,
    width: 1404,
    height: 1872
};

// Generating the PDF
(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(await builder.bonjour(), content_options)
    await page.pdf(pdf_options)
    await browser.close()
})();