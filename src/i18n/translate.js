import { dictionary } from "./dictionary";

export const translate = (key, lang = "EN") => {
  const keys = key.split(".");
  let text = dictionary;

  for (let k of keys) {
    text = text?.[k];
  }

  if (!text) return key;

  if (lang === "BOTH") {
    return `${text.en} / ${text.ur}`;
  }

  return lang === "UR" ? text.ur : text.en;
};
