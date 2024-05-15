import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../model/service/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ReponseInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor error:', error); // Log the error to the console

        if (error.status === 401 && !request.url.includes('login')) {
          if (error.url && !error.url.includes('login')) {
            Swal.fire({
              icon: 'error',
              title: 'No autorizado',
              text: 'Su sesión ha caducado. Por favor, inicie sesión nuevamente.',
              confirmButtonText: 'Okay',
              confirmButtonColor: '#AA2535',
            }).then(() => {
              this.router.navigate(['/login']);
            });
          }
        }
        return throwError(error);
      })
    );
  }
}
