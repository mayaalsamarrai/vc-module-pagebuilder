import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs/operators';

import { MessageService } from '@shared/services';

import * as themeActions from '@themes/store/theme.actions';
import * as editorActions from '@editor/store/editor.actions';

@Injectable()
export class ErrorsEffects {
    constructor(private actions$: Actions, private errors: MessageService) { }

    loadBlocksSchemaFail$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.blocksSchemaFail),
        map((action: any) => <HttpErrorResponse>action.payload),
        filter(response => response.status >= 400),
        tap(response => this.errors.displayError('Couldn\'t load blocks schema', response))
    ), { dispatch: false });

    loadPageFail$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.loadPageFail),
        map((action: any) => <HttpErrorResponse>action.payload),
        filter(response => response.status >= 400),
        tap(response => this.errors.displayError('Couldn\'t load page', response))
    ), { dispatch: false });

    @Effect({ dispatch: false })
    loadThemesFail$ = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.LoadThemesFail),
        map((action: any) => <HttpErrorResponse>action.payload),
        filter(response => response.status >= 400),
        tap(response => this.errors.displayError('Couldn\'t load theme settings', response))
    );

    @Effect({ dispatch: false })
    loadThemeSchemaFail$ = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.LoadSchemaFail),
        map((action: any) => <HttpErrorResponse>action.payload),
        filter(response => response.status >= 400),
        tap(response => this.errors.displayError('Couldn\'t load theme schema', response))
    );
}
