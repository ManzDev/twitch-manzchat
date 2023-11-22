export const getEmoteImage = (id, format = "default", theme = "dark", scale = "1.0") => {
  const img = document.createElement("img");
  img.className = "emote";
  img.src = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
  img.alt = "emote";
  return img;
};

export const getEmoteHTML = (id, format = "default", theme = "dark", scale = "1.0") => {
  const url = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`;
  return `<img src="${url}" alt="emote" />`;
};

export const parseEmotes = (message, options) => {
  const emoteList = Object.entries(options.emotes);
  const emotes = {};

  emoteList.forEach(([emote, positionList]) => {
    const [first, second] = positionList[0].split("-").map(pos => Number(pos));
    const name = message.substring(first, second + 1);
    emotes[name] = emote;
  });

  return emotes;
};
