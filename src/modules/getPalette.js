const DEFAULT_COLOR = "#672896";

const PALETTE = [
  { original: "#ff0000", softColor: "#eb2525", name: "Rojo" },
  { original: "#0000ff", softColor: "#2545eb", name: "Azul" },
  { original: "#008000", softColor: "#3f9a1f", name: "Verde" },
  { original: "#b22222", softColor: "#eb3d25", name: "Ladrillo" },
  { original: "#ff7f50", softColor: "#ee8761", name: "Coral" },
  { original: "#9acd32", softColor: "#5bbc2d", name: "Verde Amarillento" },
  { original: "#ff4500", softColor: "#e2511b", name: "Rojo anaranjado" },
  { original: "#2e8b57", softColor: "#34a465", name: "Verde mar" },
  { original: "#daa520", softColor: "#ddaf3b", name: "Ocre" },
  { original: "#d2691e", softColor: "#cf712e", name: "Chocolate" },
  { original: "#5f9ea0", softColor: "#54b3b6", name: "Azul cadete" },
  { original: "#1e90ff", softColor: "#2778c8", name: "Azul dodgers" },
  { original: "#ff69b4", softColor: "#dc74b2", name: "Rosa chillón" },
  { original: "#8a2be2", softColor: "#6e3fd3", name: "Azul violáceo" },
  { original: "#00ff7f", softColor: "#31da6a", name: "Verde primavera" }
];

export const getSoftColor = (original) => {
  if (!original) { return DEFAULT_COLOR; }

  const originalColor = original.toLowerCase();
  const foundColor = PALETTE.find(color => color.original === originalColor);

  return foundColor?.softColor || originalColor;
};
