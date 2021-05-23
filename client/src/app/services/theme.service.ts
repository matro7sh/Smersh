import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeStorage } from 'src/app/storage/Theme';
export enum Theme {
  DARK_THEME = 'dark-theme',
  LIGHT_THEME = '',
}

@Injectable()
export class ThemeService {
  private _currentTheme: Theme = new ThemeStorage().get() as Theme || Theme.LIGHT_THEME;
  public readonly onChangeTheme = new BehaviorSubject<Theme>(this._currentTheme);

  public get currentTheme(): Theme {
    return this._currentTheme;
  }

  public toggleTheme(): void {
    this._currentTheme =
      this._currentTheme === Theme.LIGHT_THEME
        ? Theme.DARK_THEME
        : Theme.LIGHT_THEME;
    this.onChangeTheme.next(this._currentTheme);
    new ThemeStorage().set(this._currentTheme)
  }
}
