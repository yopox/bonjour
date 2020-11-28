# bonjour

Bonjour is a PDF generator.
The goal is to generate a custom newspaper every day which can be synced with a Remarkable device.

# Requirements

- `node`
- `Poppins` font-family ([Google fonts](https://fonts.google.com/specimen/Poppins?category=Sans+Serif))

# How to use

1. `npm install` (first time only)
2. `npm run bonjour`

# Project organization

- `index.js`
    - Builds the PDF with puppeteer
    - **TODO**: Google Drive sync & remarkable sync
- `builder.js`
    - Builds the html content using components
- `components/`
    - Definition of the different components, the `build(options)` function returns html elements (string)
- `config/`
    - Configuration folder

# Config

## General

Check `config/general.js`.

## `calendar`

1. Create a project in the [Google Developer console](https://console.developers.google.com).
2. Create a service account for this project (identifiers section).
3. Create a `.json` key for this service account, and copy it to `config/`.
4. For each [google calendar](https://calendar.google.com) you want to link, authorize the service account email (Calendars | Options | Settings and sharing | Share with specific people | Add people).
5. Edit `exports.calendar` in `config/general.js` with the path to the `.json` file, the service account address, and the calendars to use.
