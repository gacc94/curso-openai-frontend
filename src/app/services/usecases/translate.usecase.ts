import { Injectable } from '@angular/core';
import { BaseUseCase } from './base.usecase';
import { environment } from '@/environments/environment';
import { TranslateResponse } from '../interfaces/translate.response';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateUseCase extends BaseUseCase<TranslateResponse> {
    #url = environment.apis.gpt.translate;

    execute(prompt: string, lang: string): Observable<TranslateResponse> {
        return this.http
            .post<TranslateResponse>(this.#url, { prompt, lang })
            .pipe(tap((resp) => this.addGptMessage(resp, 'translateMessage')));
    }
}
