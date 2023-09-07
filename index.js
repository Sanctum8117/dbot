const tolkien = process.env['tokk']
const keepAlive = require("./server");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/slashHandler");
const { loadpCommands } = require("./Handlers/prefixHandler");

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require("@distube/soundcloud");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});



client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
});
client.commands = new Collection();

client.pcommands = new Collection();
client.commandaliases = new Collection();

module.exports = client;

keepAlive();

client.login(tolkien).then(() => {
  loadEvents(client);
  loadCommands(client);
  loadpCommands(client);
});
