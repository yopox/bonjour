const puppeteer = require("puppeteer")
const fs = require('fs');
const builder = require("./builder")

// Create output folder
if (!fs.existsSync('output')){
    fs.mkdirSync('output');
}

// Puppeteer options
const content_options = {waitUntil: "networkidle0"}
const date = new Date()
const pdf_options = {
    path: `output/bonjour-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}.pdf`,
    printBackground: true,
    width: 1404,
    height: 1872
};

// Generating the PDF
(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(builder.bonjour(), content_options)
    await page.pdf(pdf_options)
    await browser.close()
})();