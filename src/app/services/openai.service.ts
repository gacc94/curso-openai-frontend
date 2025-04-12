import { inject, Injectable } from '@angular/core';
import { OrthographyUsecaseService } from './usecases/orthography-usecase.service';
import { map, Observable } from 'rxjs';
import { OrthographyResponse } from './interfaces/orthography.interface';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    #orthographyUseCase = inject(OrthographyUsecaseService);

    getOrthographyCheck(prompt: string): Observable<OrthographyResponse> {
        return this.#orthographyUseCase.execute(prompt).pipe();
    }
}
