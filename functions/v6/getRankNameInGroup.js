const vixError = require("../../util/vixError");
const noblox = require("noblox.js");
// credit to aoi.canvas akaka Lordex.js

module.exports = {
  name: "$getRankNameInGroup",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    let [groupid, userid] = data.inside.splits;
    try {
      if (!groupid && !userid) {
        return vixError(d, "GroupID and UserId required.");
      } else if (groupid && userid) {
        let userdata = await noblox.getRankNameInGroup(groupid, userid);
        let d = JSON.stringify(userdata);
        var commanddata = userdata.replace(/"/g, "");
      }
      data.result = commanddata;
    } catch (err) {
      return vixError(d, err);
    }
    return {
      code: d.util.setCode(data),
    };
  },
};
