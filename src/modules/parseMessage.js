import { getEmoteImage } from "./parseEmotes.js";

const MAX_MESSAGE_LENGTH = 125;

const createNode = (word, options = {}) => {
  const node = document.createElement(options.tag ?? "div");
  node.className = options.className;
  node.textContent = `${word} `;
  return node;
};

export const parseMessage = (message, options, emotes) => {
  let counter = 0;
  const fragments = new DocumentFragment();
  const emotesWords = options.emotes ? Object.keys(emotes) : [];

  const words = message.split(" ");
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const isEmote = emotesWords.includes(word);
    const isNick = /^@[A-Za-zñ_0-9]{4,}$/.test(word);
    const isReply = Boolean(options.reply);
    const isMentionReply = isReply && index === 0;
    const isURL = /^(https?:\/\/).+$/.test(word);

    const setText = (word) => {
      if (isMentionReply) {
        return document.createTextNode("");
      }

      if (isNick) {
        return createNode(word, { tag: "span", className: "user" });
      }

      if (isURL) {
        const url = word
          .replace("https://www.", "")
          .replace("http://www.", "")
          .replace("https://", "")
          .replace("http://", "");
        return createNode(url, { tag: "span", className: "url" });
      }

      if (isEmote) {
        counter += 7;
        return getEmoteImage(emotes[word]);
      }

      counter += word.length + 1;
      return document.createTextNode(`${word} `);
    };

    const node = setText(word);
    fragments.appendChild(node);

    if (counter > MAX_MESSAGE_LENGTH) {
      fragments.appendChild(document.createTextNode("..."));
      break;
    }
  }

  return fragments;
};
