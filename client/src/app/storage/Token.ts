import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AbstractStorage } from './AbstractStorage';

export class Token extends AbstractStorage {
  protected key = 'token';
}

interface SmershToken extends JwtPayload {
  roles: string[];
}

export class DecodedToken extends Token {
  public getDecoded(): SmershToken {
    const token = this.get();
    return token ? jwtDecode<SmershToken>(this.get()) : { roles: [] };
  }
}
