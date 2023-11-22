import { Client } from "tmi.js";
import { channel, IGNORE_USERS } from "./config.js";
import "../components/ChatSystem.js";

const chatSystem = document.querySelector("chat-system");

const client = new Client({
  channels: [channel],
  connection: { reconnect: true }
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  const username = tags.username;
  const nick = tags["display-name"];
  const color = tags.color;
  const moderator = Boolean(tags.mod);
  const reply = tags["reply-parent-display-name"];
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
  const first = Boolean(tags["first-msg"]);
  const broadcaster = Boolean(tags.badges && tags.badges.broadcaster);
  const subGifter = Number(tags.badges && tags.badges["sub-gifter"]) || null;
  const gifterLeader = Number(tags.badges && tags.badges["sub-gift-leader"]) || null;
  const gifter = gifterLeader || subGifter;
  const subscriber = Number(tags.badges?.subscriber ?? -1);
  const isCommand = message.startsWith("!");
  const emotes = tags.emotes;

  const isIgnored = IGNORE_USERS.includes(username.toLowerCase());
  // console.log({ username, tags });

  const options = {
    color,
    first,
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
    noVideo
  };

  /*
  if (moderator || broadcaster) {
    if (message.toLowerCase() === "!mute") {
      const to = message.split(" ")[1].replace("@", "");
      IGNORE_USERS.push(to);
    } else if (message.toLowerCase() === "!unmute") {
      const to = message.split(" ")[1].replace("@", "");
      const index = IGNORE_USERS.findIndex(user => user === to);
      index > 0 && IGNORE_USERS.splice(index, 1);
    }
  }
  */

  !isIgnored && chatSystem.addChatMessage(username, nick, message, options);
});
