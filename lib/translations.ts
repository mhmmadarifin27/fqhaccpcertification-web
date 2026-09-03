import type { Language, TranslationDictionary } from "./translations/types";
import { id } from "./translations/id";
import { en } from "./translations/en";

export type { Language, TranslationDictionary } from "./translations/types";

export const translations: Record<Language, TranslationDictionary> = { id, en };
