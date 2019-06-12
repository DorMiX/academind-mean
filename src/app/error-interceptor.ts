import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private dialog: MatDialog,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError(
          (error: HttpErrorResponse) => {
            this.dialog.open(ErrorComponent, {
              height: '200px',
              width: '250px',
            });
            return throwError(error);
          }
        )
      );
  }
}
