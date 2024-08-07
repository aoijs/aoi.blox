const vixloadmsg = require("./util/vixloader.js");
const path = require("path");
const fs = require("fs");

class AoiBlox {
  constructor(bot, config) {
    const robloxaccountcookie = config?.cookie || null;
    const dbt = config?.dbtable || "0";

    bot.Aoiblox = {
      cookie: robloxaccountcookie,
      dbtable: dbt,
    };

    this.load(bot);
  }

  async load(bot) {
    try {
      await new Promise((resolve) => {
        bot.once("ready", () => {
          this.start(bot);
          resolve();
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async start(bot) {
    try {
      for (const file of fs
        .readdirSync(path.join(__dirname, "./functions/v6"))
        .filter((file) => file.endsWith(".js"))) {
        const thefunction = require("./functions/v6/" + file);
        bot.functionManager.createFunction(thefunction);
      }
      vixloadmsg(
        [
          {
            text: `aoi.blox a port from Noblox to Aoi.js`,
            textColor: "green",
          },
        ],
        "white",
        { text: "aoi.blox ", textColor: "cyan" }
      );
    } catch (error) {
      console.log(`aoi.blox failed to load. ${error}`);
    }
  }

  getData() {
    return this.data;
  }
}

module.exports = { AoiBlox } || AoiBlox
