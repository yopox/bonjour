const moment = require('moment')

exports.build = function (options) {
    return {
        html: `<div class="mono">${moment().format("DD•MM•YYYY")}</div>`,
    }
}