const vixError = require("../../util/vixError");

module.exports = {
  name: "$moderate",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    let [
      userID = "null",
      Reason = "null",
      Punishment = "null",
      Moderator = "null",
    ] = data.inside.splits;

    try {
      if (!userID || !Reason || !Punishment || !Moderator) {
        return vixError(d, "At least one of the args is required");
      } else {
        let table = d.client.Aoiblox.dbtable;
        // Find the latest case number
        let latestCaseObject =
          (await d.client.db.get(
            d.client.db.tables[table],
            "latest_case",
            d.guild?.id
          )) || {};
        let latestCase = parseInt(latestCaseObject.value) || 0;

        // Increment the latest case number to get the next case number
        let nextCaseNumber = latestCase + 1;

        // Set the value for the next case
        let logs = await d.client.db.set(
          d.client.db.tables[table],
          `case_${nextCaseNumber}`,
          d.guild?.id,
          `{"userId": "${userID}","reason": "${Reason}","punishment": "${Punishment}","moderator": "${Moderator}", "timestamp": "${Date.now()}", "edited": "False"}`
        );
        
        let some = await d.client.db.set(
          d.client.db.tables[table],
          "latest_case",
          d.guild?.id,
          nextCaseNumber
        );

        var commanddata = JSON.stringify({
          success: true,
          caseID: nextCaseNumber,
        });
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
