import { MessageInfo } from '@/app/interfaces';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OrthographyResponse } from '../interfaces/orthography.interface';
import { StateService } from '@/app/states/services/state.service';

@Injectable({ providedIn: 'root' })
export class OrthographyUsecaseService {
    #http = inject(HttpClient);
    #state = inject(StateService);
    #baseUrl = environment.api.gpt.orthography;

    execute(prompt: string): Observable<OrthographyResponse> {
        return this.#http
            .post<OrthographyResponse>(this.#baseUrl, { prompt })
            .pipe(tap((resp) => this.#addGptMessage(resp)));
    }

    #addGptMessage(response: OrthographyResponse): void {
        this.#state.orthographyMessage = {
            isGpt: true,
            infoGpt: response,
        };
    }
}
