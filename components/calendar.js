const moment = require('moment')
const gcal = require('node-google-calendar')
const config1 = require("../config/googleCal")


const style = `
    .calendar-day {
        width: 75px;
        height: 75px;
        border-radius: 100px;
        border: 5px solid black;
        margin: 0 25px;
        line-height: 75px;
        text-align: center;
    }
    
    .calendar-selected {
        background-color: #000;
        color: #FFF;
    }
`

exports.build = async function (options) {
    const days = []
    const weekDay = moment().weekday()
    let html = `<style>${style}</style><div class="column justify">`

    // Days
    html += '<div class="row justify align">'
    for (let i = 1 - weekDay; i < 8 - weekDay; i++) {
        let dayNb = moment().add(i, "day").format('DD')
        let classes = 'calendar-day' + ((i === 0) ? ' calendar-selected' : '')
        html += `<div class="${classes}">${dayNb}</div>`
    }
    html += '</div>'

    let cal1 = new gcal(config1)
    let events = await cal1.Events.list(config1.calendarId.primary, {
        timeMin: '2020-11-24T22:00:00+08:00',
        timeMax: '2020-11-30T22:00:00+08:00',
        q: '',
        singleEvents: true,
        orderBy: 'startTime'
    })

    let hhmm = (dateTime) => { return moment(dateTime).format("hh:mm") }

    events.forEach((event) => {
        html += `<div>
            ${hhmm(event.start.dateTime)} - ${hhmm(event.end.dateTime)}: ${event.summary}</div>`
    })

    html += '</div>'

    return {
        title: 'calendar',
        html: html,
    }
}