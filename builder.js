const greeter = require("./components/greeter")
const style = "body { margin: 0; }"

exports.bonjour = function() {

    let html = '<html lang="en">'
    html +=
        `<head>
            <title>bonjour</title>
            <style>${style}</style>
        </head>`

    html += '<body>'
    html += greeter.build({name: "yopox"})
    html += '</body></html>'
    return html
}
