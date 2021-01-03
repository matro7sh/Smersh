import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AbstractStorage } from './AbstractStorage';

export class Token extends AbstractStorage {
    protected key = 'token';
}

export class DecodedToken extends Token {
    public getDecoded(): JwtPayload {
        const token = this.get();
        return token ? jwtDecode<JwtPayload>(this.get()) : {};
    }
}
