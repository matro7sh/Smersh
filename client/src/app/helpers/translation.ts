import { TranslationFromAPIInterface } from 'src/app/model/Translation';
import { Locale } from 'src/app/storage/Locale';

export function getTranslation(
  translations: Record<string, TranslationFromAPIInterface>
): TranslationFromAPIInterface {
  if (!translations) {
    return undefined;
  }
  const locale = new Locale().get();
  return (
    translations[locale?.toString() ?? 'en'] ??
    translations.en ??
    translations[Object.keys(translations)[0]]
  );
}
