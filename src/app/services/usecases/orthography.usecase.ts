import { MessageInfo } from '@/app/interfaces';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OrthographyResponse } from '../interfaces/orthography.response';
import { StateService } from '@/app/states/services/state.service';
import { BaseUseCase } from './base.usecase';

@Injectable({ providedIn: 'root' })
export class OrthographyUsecase extends BaseUseCase<OrthographyResponse> {
    #url = environment.apis.gpt.orthography;

    execute(prompt: string): Observable<OrthographyResponse> {
        return this.http
            .post<OrthographyResponse>(this.#url, { prompt })
            .pipe(tap((resp) => this.#addGptMessage(resp)));
    }

    #addGptMessage(response: OrthographyResponse): void {
        this.state.orthographyMessage = {
            isGpt: true,
            infoGpt: response,
        };
    }
}
