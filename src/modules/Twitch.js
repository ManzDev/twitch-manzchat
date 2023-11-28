import { Client } from "tmi.js";
import { channel, IGNORE_USERS } from "./config.js";
import { getSoftColor } from "./getPalette.js";
import "../components/ChatSystem.js";

const chatSystem = document.querySelector("chat-system");

const client = new Client({
  channels: [channel],
  connection: { reconnect: true }
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  // user
  const username = tags.username;
  const nick = tags["display-name"];
  const color = getSoftColor(tags.color);

  // message
  const reply = tags["reply-parent-display-name"];
  const isCommand = message.startsWith("!");
  const firstMessage = Boolean(tags["first-msg"]);
  const isQuack = message.toLowerCase().startsWith("*quack*");

  // badges
  const moderator = Boolean(tags.mod);
  const prime = Boolean(tags.badges && tags.badges.premium);
  const vip = Boolean(tags.badges && tags.badges.vip);
  const cheers = Boolean(tags.badges && tags.badges.bits);
  const bitsLeader = Number(tags.badges && tags.badges["bits-leader"]) || null;
  const partner = Boolean(tags.badges && tags.badges.partner);
  const noAudio = Boolean(tags.badges && tags.badges.no_audio);
  const noVideo = Boolean(tags.badges && tags.badges.no_video);
  const bits = bitsLeader || cheers;
  const train = Boolean(tags.badges && tags.badges["hype-train"]);
  const founder = Boolean(tags.badges && tags.badges.founder);
  const broadcaster = Boolean(tags.badges && tags.badges.broadcaster);
  const subGifter = Number(tags.badges && tags.badges["sub-gifter"]) || null;
  const gifterLeader = Number(tags.badges && tags.badges["sub-gift-leader"]) || null;
  const gifter = gifterLeader || subGifter;
  const subscriber = Number(tags.badges?.subscriber ?? -1);

  const emotes = tags.emotes;
  console.log({ username, tags, message });

  const options = {
    color,
    firstMessage,
    vip,
    bits,
    broadcaster,
    moderator,
    prime,
    subscriber,
    gifter,
    isCommand,
    emotes,
    reply,
    partner,
    train,
    founder,
    noAudio,
    noVideo,
    isQuack
  };

  if (isCommand && (moderator || broadcaster)) {
    const command = message.split(" ").at(0).toLowerCase();
    if (command === "!mute") {
      const to = message.split(" ")[1].replace("@", "").toLowerCase();
      IGNORE_USERS.push(to);
    } else if (command === "!unmute") {
      const to = message.split(" ")[1].replace("@", "").toLowerCase();
      const index = IGNORE_USERS.findIndex(user => user === to);
      index > 0 && IGNORE_USERS.splice(index, 1);
    }
  }

  const isIgnored = IGNORE_USERS.includes(username.toLowerCase());
  !isIgnored && chatSystem.addChatMessage(username, nick, message, options);
});
