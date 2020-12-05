const config = require("../config/general")

exports.build = async function (options = {}) {
    return {
        html: `<h1 style="margin-top: 0">bonjour, ${config.name}</h1>`,
    }
}
