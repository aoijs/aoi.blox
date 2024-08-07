const vixError = require("../../util/vixError")
const noblox = require("noblox.js");
// credit to aoi.canvas akaka Lordex.js

module.exports = {
    name: "$exile",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [groupid, user, token] = data.inside.splits;
        try {
            let cookiedata = d.client.Aoiblox?.cookie
        if(!groupid && !user && !token || cookiedata) {
           return vixError(d, "All three arguments are required: GroupID, Target, Roblox Account Cookie");
        } else if(groupid && user && token || cookiedata) {
            let userdata = await noblox.exile({group: groupid, target: user, jar: token || cookiedata})
            var commanddata = JSON.stringify({
                groupId: groupid,
                userId: user,
                exiled: true
            });
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