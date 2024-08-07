async function vixWarn(d, msg) {
    try {
    console.log(`\x1b[33mVixBloxWarning:\x1b[97m ${msg}`);
    let data = d.util.aoiFunc(d);
    data.result = ""
    return {code: d.util.setCode(data)}
    } catch (err) {
        console.log(err)
    }
}

module.exports = vixWarn;
