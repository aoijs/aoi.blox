const vixError = require("../../util/vixError")
const noblox = require("noblox.js");
// credit to aoi.canvas akaka Lordex.js

module.exports = {
    name: "$sendFriendRequest",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [user, token] = data.inside.splits;
        try {
            let cookiedata = d.client.Aoiblox?.cookie;
        if(!user && !token || !cookiedata) {
           return vixError(d, "All three arguments are required: GroupID, Target, Roblox Account Cookie");
        } else if(user && token || cookiedata) {
            let userdata = await noblox.sendFriendRequest({ target: user, jar: (token ?? cookiedata)})
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