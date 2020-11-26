/* calendar component.
 * Adds support for google calendars to bonjour.
 *
 * `config/calendar.js` config file is required.
 *  See `readme.md` for help with configuration.
 */
const moment = require('moment')
const gcal = require('node-google-calendar')

// Replace with your cal config
const config = require("../config/calendar")

const daySize = 85
const dayMargin = 25
const dayBorder = 4
const style = `
    #calendar-container {
        width: 100%;
    }
    
    .calendar-day {
        width: ${daySize}px;
        height: ${daySize}px;
        border-radius: ${daySize}px;
        border: ${dayBorder}px solid black;
        margin: 0 ${dayMargin}px;
        line-height: ${daySize - dayBorder * 2}px;
        text-align: center;
        box-sizing: border-box;
    }
    
    .calendar-selected {
        background-color: #000;
        color: #FFF;
    }
    
    #calendar-events {
        font-size: 30px;
        line-height: 50px;
        padding-top: 50px;
        width: ${daySize * 7 + dayMargin * 11}px;
        margin: auto;
    }
    
    .calendar-time {
        font-family: JetBrains Mono, monospace;
        width: 280px;
    }
    
    .calendar-summary {
        width: ${daySize * 7 + dayMargin * 11 - 280}px;
    }
`

exports.build = async function (options) {
    let html = `<style>${style}</style><div id="calendar-container" class="column justify align">`

    // Days
    html += buildDays()

    // Events
    html += await buildEvents()

    html += '</div>'

    return {
        title: 'calendar',
        html: html,
    }
}

function buildDays() {
    const weekDay = moment().weekday()

    let html = '<div class="row justify align">'

    for (let i = 1 - weekDay; i < 8 - weekDay; i++) {
        let dayNb = moment().add(i, "day").format('DD')
        let classes = 'calendar-day' + ((i === 0) ? ' calendar-selected' : '')
        html += `<div class="${classes}">${dayNb}</div>`
    }

    html += '</div>'
    return html
}

async function buildEvents() {
    let html = '<div id="calendar-events" class="column">'

    let events = []
    let cal = new gcal(config)
    let day = moment().format("YYYY-MM-DD")

    // Fetch events of the day
    for (const calID in config.calendars) {
        let calEvents = await cal.Events.list(config.calendars[calID], {
            timeMin: `${day}T00:00:00${config.timezone}`,
            timeMax: `${day}T23:59:59${config.timezone}`,
            q: '',
            singleEvents: true,
            orderBy: 'startTime'
        })
        calEvents.forEach((ev) => events.push(ev))
    }

    // Sort events, handle all day
    events.sort((e1, e2) => {
        if (!e1.start.hasOwnProperty("dateTime")) {
            e1.allDay = true
            return -1
        }
        if (!e2.start.hasOwnProperty("dateTime")) {
            e2.allDay = true
            return 1
        }
        return e1.start.dateTime.localeCompare(e2.start.dateTime)
    })

    // Formatting function for the event time
    let hhmm = (dateTime) => { return moment(dateTime).format("HH:mm") }

    // Build events elements
    events.forEach((event) => {
        let time = event.hasOwnProperty("allDay") ? 'All day' : `${hhmm(event.start.dateTime)} — ${hhmm(event.end.dateTime)}`
        html += `<div class="row">
                    <div class="calendar-time">${time}</div>
                    <div class="calendar-summary">${event.summary}</div>
                </div>`
    })

    html += '</div>'
    return html
}