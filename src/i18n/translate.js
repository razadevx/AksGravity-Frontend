import { dictionary } from "./dictionary";

export function translate(key, lang = "EN") {
  const keys = key.split(".");
  let value = dictionary;

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) return key;

  if (lang === "BOTH") {
    return `${value.en} / ${value.ur}`;
  }

  return value[lang.toLowerCase()];
}
