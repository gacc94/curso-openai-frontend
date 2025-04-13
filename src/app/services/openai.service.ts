import { inject, Injectable } from '@angular/core';
import { OrthographyUsecase, ProsConsUseCase } from './usecases/';
import { Observable } from 'rxjs';
import { OrthographyResponse, ProsConsResponse } from './interfaces';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    #orthographyUseCase = inject(OrthographyUsecase);
    #prosConsUseCase = inject(ProsConsUseCase);

    getOrthographyCheck(prompt: string): Observable<OrthographyResponse> {
        return this.#orthographyUseCase.execute(prompt);
    }

    getProsCons(prompt: string): Observable<ProsConsResponse> {
        return this.#prosConsUseCase.execute(prompt);
    }
}
