import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

declare module 'express' {
  export interface RequestExpress {
    user: JwtPayload;
  }
}
