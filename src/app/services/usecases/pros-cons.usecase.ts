import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProsConsResponse } from '../interfaces';
import { BaseUseCase } from './base.usecase';

@Injectable({ providedIn: 'root' })
export class ProsConsUseCase extends BaseUseCase<ProsConsResponse> {
    #url = environment.apis.gpt.prosCons;

    execute(prompt: string): Observable<ProsConsResponse> {
        return this.http
            .post<ProsConsResponse>(this.#url, { prompt })
            .pipe(tap((resp) => this.#addGptMessage(resp)));
    }

    #addGptMessage(response: ProsConsResponse): void {
        this.state.prosConsMessage = {
            isGpt: true,
            infoGpt: response,
        };
    }
}
