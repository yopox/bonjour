const moment = require('moment')

exports.dateYMD = moment().format("YYYY-MM-DD")
exports.dateDMY = moment().format("DD-MM-YYYY")

exports.build = function (options) {
    return {
        html: `<div>${this.dateDMY}</div>`,
    }
}