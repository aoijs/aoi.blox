const vixError = require("../../util/vixError")
const noblox = require("noblox.js");
// credit to aoi.canvas akaka Lordex.js

module.exports = {
    name: "$leaveGroup",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [groupid, token] = data.inside.splits;
        try {
            let cookiedata = d.client.Aoiblox?.cookie
        if(!groupid && !token || cookiedata) {
           return vixError(d, "GroupID and token || cookiedata is required.");
        } else if(groupid && token || cookiedata) {
            let userdata = await noblox.leaveGroup(groupid, (token ?? cookiedata))
            var commanddata = JSON.stringify(userdata);
        }
        data.result = commanddata
    } catch (err) {
        
       return vixError(d, err)
    }
        return {
            code: d.util.setCode(data),
        };
    }
};