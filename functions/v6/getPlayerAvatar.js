const vixError = require("../../util/vixError")
const noblox = require("noblox.js");
const axios = require("axios")
const CircularJSON = require('circular-json');
// credit to aoi.canvas akaka Lordex.js

module.exports = {
    name: "$getPlayerAvatar",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        let [user, size = "180x180", format = "Png", iscircular = "false", croptype = ""] = data.inside.splits;
        try {
        if(!user) {
           return vixError(d, "Only one argument is requied and that is: Userid to find the user Optionals: Size: The size of the image to be returned; defaults highest resolution, Format: The file format of the returned thumbnails, IsCircular: Return the circular version of the thumbnails");
        } else if(user) {
            if (!croptype) {
                let userdata = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${user}&size=${size}&format=${format}&isCircular=${iscircular}`)
            let d = CircularJSON.stringify(userdata.data.data[0].imageUrl)
            var commanddata = d.replace(/"/g, "")
            } else {
            let userdata = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-${croptype}?userIds=${user}&size=${size}&format=${format}&isCircular=${iscircular}`)
            let d = CircularJSON.stringify(userdata.data.data[0].imageUrl)
            var commanddata = d.replace(/"/g, "")
            }
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