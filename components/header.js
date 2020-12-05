const moment = require('moment')

exports.build = async function (options = {}) {
    return {
        html: `<header class="mono">${moment().format("DD•MM•YYYY")}</header>`,
    }
}