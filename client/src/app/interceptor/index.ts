import { UnauthorizedInterceptor } from './unauthorized.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const interceptors = [UnauthorizedInterceptor].map((interceptor) => ({
  provide: HTTP_INTERCEPTORS,
  useClass: interceptor,
  multi: true,
}));

export { interceptors };
