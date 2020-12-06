# bonjour

Bonjour is a PDF generator.
The goal is to generate a custom newspaper every day which can be synced with a Remarkable device.

# Requirements

- `node`
- `Poppins` font-family ([Google Fonts](https://fonts.google.com/specimen/Poppins?category=Sans+Serif))
- `Noto Sans JP` font-family if you use Japanese components ([Google Fonts](https://fonts.google.com/specimen/Noto+Sans+JP?subset=japanese))

# How to use

Check [the wiki](https://www.github.com/yopox/bonjour/wiki) for getting started.

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