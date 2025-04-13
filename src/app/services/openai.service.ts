import { inject, Injectable } from '@angular/core';
import { OrthographyUsecase, ProsConsUseCase } from './usecases/';
import { Observable } from 'rxjs';
import { OrthographyResponse, ProsConsResponse } from './interfaces';
import { ProsConsStreamUseCase } from './usecases/pros-const-stream.usecase';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    #orthographyUseCase = inject(OrthographyUsecase);
    #prosConsUseCase = inject(ProsConsUseCase);
    #prosConsUseStreamCase = inject(ProsConsStreamUseCase);

    getOrthographyCheck(prompt: string): Observable<OrthographyResponse> {
        return this.#orthographyUseCase.execute(prompt);
    }

    getProsCons(prompt: string): Observable<ProsConsResponse> {
        return this.#prosConsUseCase.execute(prompt);
    }

    getProsConsStream(prompt: string) {
        return this.#prosConsUseStreamCase.execute(prompt);
    }
}
