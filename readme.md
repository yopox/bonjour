# bonjour

Bonjour is a PDF generator.
The goal is to generate a custom newspaper every day which can be synced with a Remarkable device.

# Dependencies

- `nodejs`
- `Poppins` font-family ([Google Fonts](https://fonts.google.com/specimen/Poppins?category=Sans+Serif))
- `Noto Sans JP` font-family if you use Japanese components ([Google Fonts](https://fonts.google.com/specimen/Noto+Sans+JP?subset=japanese))

# How to use

1. Getting started
  - Check [the wiki](https://www.github.com/yopox/bonjour/wiki) for getting started.

2. Generating a PDF
  - `npm run localPDF`

3. Uploading the PDF to the Remarkable cloud
  - `npm run upload`

# Project organization

- `index.js`
    - Builds the PDF with puppeteer
- `builder.js`
    - Builds the html content using components
- `upload.js`
    - Uploads the PDF of the day to the Remarkable cloud
- `components/`
    - Definition of the different components
- `config/`
    - Configuration folder