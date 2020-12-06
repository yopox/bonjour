# bonjour

Bonjour is a PDF generator.
The goal is to generate a custom newspaper every day which can be synced with a Remarkable device.

# Requirements

- `node`
- `Poppins` font-family ([Google fonts](https://fonts.google.com/specimen/Poppins?category=Sans+Serif))

# How to use

Check [the wiki](github.com/yopox/bonjour/wiki) for getting started.

# Project organization

- `index.js`
    - Builds the PDF with puppeteer
    - **TODO**: Google Drive sync & remarkable sync
- `builder.js`
    - Builds the html content using components
- `components/`
    - Definition of the different components
- `config/`
    - Configuration folder