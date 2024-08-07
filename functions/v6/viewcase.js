const vixError = require("../../util/vixError");

module.exports = {
  name: "$viewcase",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    let [caseID = "null"] = data.inside.splits;

    try {
      if (!caseID) {
        return vixError(d, "You need a caseID to continue.");
      } else {
        let table = d.client.Aoiblox?.dbtable;
        // Fetch the case data from the database based on the provided caseID
        let caseDataObject = await d.client.db.get(
          d.client.db.tables[table],
          `case_${caseID}`,
          d.guild?.id
        );

        if (caseDataObject) {
          // Extract the value property from the case data object
          let caseDataString = caseDataObject.value;

          // Parse the string representation of the JSON object
          let caseData;
          try {
            caseData = JSON.parse(caseDataString);
          } catch (error) {
            // Handle parsing error if the data is not a valid JSON string
            return vixError(d, `Error parsing case data: ${error.message}`);
          }

          // Add the caseID property to the parsed JSON object
          caseData.caseID = caseID;

          // Process the data as needed
          //console.log(`Viewing case_${caseID} data:`, caseData);

          // Convert the modified object back to a JSON string
          var commanddata;
          commanddata = JSON.stringify(caseData);
        } else {
          // Case not found
          commanddata = JSON.stringify({
            userId: "null",
            reason: "null",
            punishment: "null",
            moderator: "null",
            caseID: "null",
          });
          // return vixError(d, `Case with ID ${caseID} not found.`);
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
