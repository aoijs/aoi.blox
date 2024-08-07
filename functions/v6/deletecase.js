const vixError = require("../../util/vixError");

module.exports = {
  name: "$deletecase",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    let [caseID = "null"] = data.inside.splits;

    try {
      if (!caseID) {
        return vixError(d, "CaseID is required to delete a case.");
      } else {
        try {
          const table = d.client.Aoiblox?.dbtable;
          // Check if the case exists in the database
          let caseDataObject = await d.client.db.get(
            d.client.db.tables[table],
            `case_${caseID}`,
            d.guild?.id
          );

          if (!caseDataObject) {
            return vixError(d, `Case with ID ${caseID} not found.`);
          }

          // Delete the case data from the database
          await d.client.db.delete(
            d.client.db.tables[table],
            `case_${caseID}`,
            d.guild?.id
          );

          // Notify about the successful deletion
          var commanddata = JSON.stringify({
            success: true,
          });
        } catch (error) {
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
