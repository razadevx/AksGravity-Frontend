import { dictionary } from "./dictionary";

export const translate = (key, lang = "EN") => {
  const keys = key.split(".");
  let value = dictionary;

  for (let k of keys) {
    value = value?.[k];
  }

  if (!value) return key;

  if (lang === "BOTH") {
    return `${value.en} / ${value.ur}`;
  }

  return value[lang.toLowerCase()] || value.en;
};
