/* calendar component.
 * Adds support for google calendars to bonjour.
 *
 *  See `readme.md` for help with configuration.
 */
const moment = require('moment')
const gcal = require('node-google-calendar')
const config = require("../config/general").calendar

const daySize = 85
const dayMargin = 25
const dayBorder = 4
const style = `<style>
    #calendar-container {
        width: 100%;
    }
    
    .calendar-day {
        width: ${daySize}px;
        height: ${daySize}px;
        border-radius: ${daySize}px;
        border: ${dayBorder}px solid black;
        margin: 0 ${dayMargin}px;
        margin-bottom: 50px;
        font-size: ${(daySize - dayBorder * 2) * 0.5}px;
        line-height: ${daySize - dayBorder * 2}px;
        text-align: center;
        box-sizing: border-box;
    }
    
    .calendar-selected {
        background-color: #000 !important;
        color: #FFF !important;
    }
    
    .calendar-gray {
        background-color: #DDD;
        color: #000;
    }
    
    #calendar-events {
        max-height: 800px;
        overflow: hidden;
        font-size: 30px;
        line-height: 50px;
        width: ${daySize * 7 + dayMargin * 11}px;
        margin: auto;
    }
    
    .calendar-time {
        width: 280px;
        font-weight: 600;
    }
    
    .calendar-summary {
        width: ${daySize * 7 + dayMargin * 11 - 280}px;
    }
    </style>`

exports.build = async function (options = {}) {
    let html = `${style}<div id="calendar-container">`

    // Days
    html += await buildDays()

    // Events
    html += await buildEvents()

    html += '</div>'

    return {
        html: `<div class="section">calendar</div>${html}`,
    }
}

async function buildDays() {
    const weekDay = moment().weekday()

    let html = '<div class="row justify align mono">'

    let offset = (weekDay === 0) ? -7 : 0 // Sunday is the last visually, first in the logical count
    for (let i = 1 - weekDay + offset; i < 8 - weekDay + offset; i++) {
        let day = moment().add(i, "day")
        let dayNb = day.format('DD')
        let gray = await isGray(day)
        let classes = 'calendar-day' + (i === 0 ? ' calendar-selected' : '') + (gray ? ' calendar-gray' : '')
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
                    <div class="calendar-time mono">${time}</div>
                    <div class="calendar-summary">${event.summary}</div>
                </div>`
    })

    // No events
    if (events.length === 0) {
        html += `<div>No events today.</div>`
    }

    html += '</div>'
    return html
}

async function isGray(day) {
    // Make weekend days gray
    let weekend = day.format("d") % 6 === 0

    return weekend
}