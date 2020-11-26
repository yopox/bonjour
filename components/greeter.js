const config = require("../config/general")

exports.build = function (options) {
    return {
        html: `<h1>bonjour, ${config.name}</h1>`,
    }
}
