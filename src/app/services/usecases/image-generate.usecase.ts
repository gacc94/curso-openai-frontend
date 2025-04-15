import { Injectable } from '@angular/core';
import { BaseUseCase } from './base.usecase';
import { ImageGenerateResponse, TranslateResponse } from '../interfaces';
import { Observable, pipe, tap } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageGenerateUseCase extends BaseUseCase<ImageGenerateResponse> {
    #url = environment.apis.gpt.imageGenerate;

    execute(prompt: string): Observable<ImageGenerateResponse> {
        return this.http
            .post<ImageGenerateResponse>(this.#url, { prompt })
            .pipe(tap((resp) => this.addGptMessage(resp, 'imageGenerateMessage')));
    }
}
