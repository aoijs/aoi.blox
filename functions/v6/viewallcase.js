const vixError = require("../../util/vixError");

module.exports = {
  name: "$viewallcase",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    let [userId = "null"] = data.inside.splits;

    try {
      if (!userId) {
        return vixError(d, "You need a userId to continue.");
      } else {
        let table = d.client.Aoiblox?.dbtable;
        // Fetch the latest case number from the database
        let latestCaseObject = await d.client.db.get(
          d.client.db.tables[table],
          "latest_case",
          d.guild?.id
        );

        // Initialize an array to store the result
        let resultArray = [];

        if (latestCaseObject) {
          let latestCase = parseInt(latestCaseObject.value) || 0;

          // Loop through all case IDs up to the latest case
          for (let i = 1; i <= latestCase; i++) {
            // Fetch the case data for the current case ID
            let caseDataObject = await d.client.db.get(
              d.client.db.tables[table],
              `case_${i}`,
              d.guild?.id
            );

            if (caseDataObject) {
              let caseDataString = caseDataObject.value;
              let caseData;

              try {
                caseData = JSON.parse(caseDataString);
              } catch (error) {
                // Handle parsing error if the data is not a valid JSON string
                continue; // Skip to the next iteration if parsing fails
              }

              // Check if the current case data has the provided userId
              if (caseData.userId === userId) {
                // Add the caseID property to the case data
                caseData.caseID = i;

                // Add the modified case data to the result array
                resultArray.push(caseData);
              }
            }
          }
        }

        if (resultArray.length > 0) {
          // Convert the array of objects to a JSON string
          var commanddata = JSON.stringify(resultArray);
        } else {
          // No cases found for the provided userId
          commanddata = JSON.stringify({
            userId: "null",
            reason: "null",
            punishment: "null",
            moderator: "null",
            caseID: "null",
          });
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
