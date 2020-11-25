const puppeteer = require("puppeteer")
const builder = require("./builder")

const content_options = {waitUntil: "networkidle0"}

const date = new Date()
const pdf_options = {path: `bonjour-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}.pdf`, width: 1404, height: 1872, printBackground: true};

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(builder.bonjour(), content_options)
    await page.pdf(pdf_options)
    await browser.close()
})();