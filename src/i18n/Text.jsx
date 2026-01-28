import { translate as t } from "./translate";
import { useLang } from "./LanguageContext";

export default function Text({ k }) {
  const { lang } = useLang();
  return t(k, lang);
}
