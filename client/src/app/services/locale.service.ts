import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../storage/Locale';

export enum Language {
  EN = 'en',
  ES = 'es',
  JP = 'jp',
  FR = 'fr',
  AR = 'ar',
  RU = 'ru',
  UA = 'ua',
  IT = 'it',
}

@Injectable()
export class LocaleService {
  private readonly localStorage = new Locale();

  /**
   *
   */
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  public switchLanguage(lang: Language): void {
    this.translate.use(lang);
    this.localStorage.set(lang);
  }

  private initLanguage(): void {
    this.translate.setDefaultLang(Language.EN); // TODO find a correct place to put static constants
    const navigatorLang =
      navigator.language.length > 2
        ? navigator.language.slice(0, 2)
        : navigator.language;
    this.switchLanguage(
      (this.localStorage.get() as Language) || (navigatorLang as Language)
    ); // Get the current language from storage if not set get language from browser
  }
}
