import { Injectable } from '@angular/core';
import burpConfig from 'src/assets/burp.json';

interface BurpInterface {
  [key: string]: unknown;
  target: {
    [key: string]: unknown;
    scope: {
      [key: string]: unknown;
      include: { enabled: boolean; prefix: string }[];
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public getBurpConfiguration(): BurpInterface {
    return burpConfig;
  }
}
