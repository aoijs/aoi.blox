# aoi.blox

# As of 6/12/2024 **this is an offical aoi.js plugin.**

aoi.blox is a package that allows you to utilize roblox api functions within Aoi.js Bot.

Docs: [Website go brr](https://vixbloxdocs.victier.xyz)

## Setup

1. Install `aoi.blox` package:

```shell
npm install aoi.blox
```

2. Import the `aoi.blox` library into your project:

```javascript
const { AoiBlox } = require("@aoijs/aoi.blox");
```

3. Load vixblox with the required parameters:

```javascript
new AoiBlox(bot, {
  dbtable: "0", // optional
  cookie: "supremegobrrr" // optional
});
```

4. You are ready to use vixblox with your Aoi.js Bot!

## Example

```javascript
const { AoiClient, Util } = require("aoi.js");
const { AoiBlox } = require("@aoijs/aoi.blox");

const client = new AoiClient({
  token: "Discord Bot Token",
  prefix: "Discord Bot Prefix",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    tables: ["main"],
    path: "./database/",
    extraOptions: {
      dbType: "KeyValue",
    },
  },
});

new AoiBlox(bot, {
  dbtable: "0", // optional
  cookie: "supremegobrrr" // optional
});

// Ping Command Example
bot.command({
  name: "ping",
  code: `Pong! $pingms`,
});

// get bob avatar :)
bot.command({
  name: "bobby",
  code: `
    $getPlayerInfo[367]
    `,
});

// expected output {"username":"Bob","displayName":"Bob","blurb":"Bobbeh es meh","joinDate":"2006-07-21T21:30:46.670Z","age":6329,"friendCount":92,"followerCount":55034,"followingCount":17658,"oldNames":[],"isBanned":false}
```

## Credits

- me (i literally made it)
- lordex aoi.canvas guy (uwuwuw he ask for it) :p
- lightner fren
- akaruiteam (aoi.js)
- leref because leref is leref
- fafa.

These are the contributors who have contributed to the aoi.vixblox project.

# Functions & Args

## [Check docs for functions args and examples](https://vixblox.victier.xyz)

---

Remember to follow the setup steps mentioned above to start using vixblox in your aoi.js Bot.

Let me know of any errors or anything to be fixed

Feel free to reach out if you have any questions or need further assistance.

Enjoy coding with aoi.blox!
