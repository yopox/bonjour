# bonjour

Bonjour is a PDF generator.
The goal is to generate a custom newspaper every day which can be synced with a Remarkable device.

# Requirements

- `node`
- `Poppins` font-family ([Google fonts](https://fonts.google.com/specimen/Poppins?category=Sans+Serif))

# How to use

1. `npm install` (first time only)
2. `npm run bonjour`

# Config

## `calendar`

1. Create a project in the [Google Developer console](https://console.developers.google.com).
2. Create a service account for this project (identifiers section).
3. Create a `.json` key for this service account, and copy it to `config/`.
4. For each [google calendar](https://calendar.google.com) you want to link, authorize the service account email (Calendars | Options | Settings and sharing | Share with specific people | Add people).
5. Create `config/calendar.js` following this model:

```js
const KEY = require("./key.json").private_key
const SERVICE_ACCT_ID = 'X@Y.iam.gserviceaccount.com'

const CALENDARS = [
    'Calendar ID 1',
    'Calendar ID 2',
]
const TIMEZONE = '+0X:00'

exports.key = KEY
exports.serviceAcctId = SERVICE_ACCT_ID
exports.timezone = TIMEZONE
exports.calendars = CALENDARS
```