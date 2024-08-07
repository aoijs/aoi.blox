const vixError = require("../../util/vixError");

module.exports = {
  name: "$editcase",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    let [
      /* not editable */ caseID = "null",
      Reason = "",
      Punishment = "",
      Moderator = "",
    ] = data.inside.splits;

    try {
      if (!caseID) {
        return vixError(d, "CaseID is required and one arg to be changed.");
      } else {
        try {
          const table = d.client.Aoiblox?.dbtable;
          // Fetch the existing case data from the database
          let caseDataObject = await d.client.db.get(
            d.client.db.tables[table],
            `case_${caseID}`,
            d.guild?.id
          );

          if (!caseDataObject) {
            return vixError(d, `Case with ID ${caseID} not found.`);
          }

          // Parse the existing case data string to a JSON object
          let caseData = JSON.parse(caseDataObject.value);

          // Update the editable properties if the corresponding strings are not empty
          if (Reason !== "") {
            caseData.reason = Reason;
          }
          if (Punishment !== "") {
            caseData.punishment = Punishment;
          }
          if (Moderator !== "") {
            caseData.moderator = Moderator;
          }
          if (caseData.timestamp !== null && caseData.timestamp !== undefined) {
            caseData.timestamp = `${Date.now()}`;
          }
          if (caseData.edited !== null && caseData.edited !== undefined) {
            caseData.edited = "True";
          }

          // Save the updated case data back to the database
          await d.client.db.set(
            d.client.db.tables[table],
            `case_${caseID}`,
            d.guild?.id,
            JSON.stringify(caseData)
          );

          // Update the caseID property
          caseData.caseID = caseID;

          // Convert the modified object back to a JSON string
          var commanddata = JSON.stringify(caseData);
        } catch (error) {
          // Handle parsing error if the data is not a valid JSON string
          return vixError(d, `Error: ${error.message}`);
        }
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
