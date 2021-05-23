import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../storage/Locale';

export enum Language {
    EN = 'en',
    ES = 'es',
    FR = 'fr'
};

@Injectable()
export class LocaleService {
    private readonly localStorage = new Locale();
    /**
     *
     */
    constructor(private translate: TranslateService) {
        this.initLanguage();
    }

    
  private initLanguage(){
    this.translate.setDefaultLang(Language.FR) // TODO find a correct place to put static constants
    const navigatorLang =  navigator.language.length > 2 ? navigator.language.slice(0,2): navigator.language ;
    this.switchLanguage(this.localStorage.get() as Language || navigatorLang as Language) // Get the current language from storage if not set get language from browser
  }

  public switchLanguage(lang: Language){
      this.translate.use(lang);
      this.localStorage.set(lang);
  }
}