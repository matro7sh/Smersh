import { Injectable } from '@angular/core';
import burpConfig from 'src/assets/burp.json';

interface BurpInterface {
  target: {
    [key: string]: unknown;
    scope: {
      [key: string]: unknown;
      include: { enabled: boolean; prefix: string }[];
    };
  };

  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public getBurpConfiguration(): BurpInterface {
    return burpConfig;
  }
}
