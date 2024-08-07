async function vixError(d, msg) {
    try {
            let vixwarn = require("./vixWarn.js")
            let data = d.util.aoiFunc(d);
            data.result = " "
           return d.aoiError.fnError(d, "custom", {}, `${msg}`);

    } catch (err) {
        console.log(err)
    }
}

module.exports = vixError;