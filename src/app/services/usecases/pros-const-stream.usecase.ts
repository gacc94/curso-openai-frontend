import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProsConsResponse, ProsConsStreamResponse } from '../interfaces';
import { BaseUseCase } from './base.usecase';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProsConsStreamUseCase extends BaseUseCase<ProsConsResponse> {
    #url = environment.apis.gpt.prosConsStream;

    execute(prompt: string): Observable<string> {
        return new Observable<string>((observer) => {
            fetch(this.#url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
                // signal: new AbortController().signal,
            })
                .then(async (resp) => {
                    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

                    const reader = resp.body?.getReader();
                    if (!reader) throw new Error('Failed to get reader from response body');

                    const decoder = new TextDecoder('utf-8');

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            observer.complete();
                            break;
                        }

                        const chunk = decoder.decode(value, { stream: true });
                        observer.next(chunk);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    observer.error(error);
                });
        });
    }

    #addGptMessage(response: ProsConsStreamResponse): void {
        this.state.prosConsStreamMessage = {
            isGpt: true,
            infoGpt: response,
        };
    }
}
