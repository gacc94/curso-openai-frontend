import { MessageInfo } from '@/app/interfaces';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrthographyResponse } from '../interfaces/orthography.interface';

@Injectable({ providedIn: 'root' })
export class OrthographyUsecaseService {
    #http = inject(HttpClient);
    #baseUrl = environment.api.gpt.orthography;

    execute(prompt: string): Observable<OrthographyResponse> {
        return this.#http.post<OrthographyResponse>(this.#baseUrl, {
            prompt,
            // maxTokens: 1000,
        });
    }
}
