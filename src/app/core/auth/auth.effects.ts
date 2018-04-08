import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { AUTH_KEY, AuthActionTypes } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  login(): Observable<Action> {
    return this.actions$
      .ofType(AuthActionTypes.LOGIN)
      .pipe(
        tap(action =>
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true })
        )
      );
  }

  @Effect({ dispatch: false })
  logout(): Observable<Action> {
    return this.actions$.ofType(AuthActionTypes.LOGOUT).pipe(
      tap(action => {
        this.router.navigate(['']);
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      })
    );
  }
}
