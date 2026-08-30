// Real-time automatic translation utility for dynamic admin content (Projects, Gallery, News, etc.)

const TRANSLATION_CACHE_KEY = "fq_auto_translations";

const getCache = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(TRANSLATION_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const setCache = (cache: Record<string, string>) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn("Translation cache save warning:", e);
  }
};

/**
 * Automatically translates Indonesian text to English using Google Translate endpoint with local caching.
 * @param text The text to translate
 * @param targetLang "en" | "id"
 */
export async function autoTranslateText(text: string, targetLang: "id" | "en"): Promise<string> {
  if (!text || text.trim() === "") return text;
  if (targetLang === "id") return text; // Default original text is already in Indonesian

  const cacheKey = `id_to_en_${text.trim()}`;
  const cache = getCache();
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(
      text
    )}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Translation request failed");

    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0].map((item: any) => item[0]).join("");
      if (translated) {
        cache[cacheKey] = translated;
        setCache(cache);
        return translated;
      }
    }
  } catch (error) {
    console.warn("Auto-translate fallback for:", text, error);
  }

  return text; // Return original if offline or error
}
