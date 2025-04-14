import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BaseUseCase } from './base.usecase';
import { environment } from '@/environments/environment';
import { TextToAudioResponse } from '../interfaces/text-to-audio.response';

@Injectable({ providedIn: 'root' })
export class TextToAudioUseCase extends BaseUseCase<TextToAudioResponse> {
    #url = environment.apis.gpt.textToAudio;

    execute(prompt: string, voice: string): Observable<TextToAudioResponse> {
        return this.http.post<Blob>(this.#url, { prompt, voice }, { responseType: 'blob' as 'json' }).pipe(
            map((audioFile) => {
                const audioUrl = URL.createObjectURL(audioFile);
                const response: TextToAudioResponse = { ok: true, message: prompt, audioUrl: audioUrl };
                return response;
            }),
            tap((resp) => this.addGptMessage(resp, 'textToAudioMessage')),
            catchError((error) => {
                console.log(error);
                return of({ ok: false, message: 'No se pudo generar el audio', audioUrl: '' });
            })
        );
    }
}
