exports.build = async function (options = {}) {
    return {
        html: `<div class="break-after">
            <div class="section">${options.title}</div>
        </div>`,
    }
}