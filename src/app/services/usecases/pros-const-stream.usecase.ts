import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProsConsResponse, ProsConsStreamResponse } from '../interfaces';
import { BaseUseCase } from './base.usecase';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProsConsStreamUseCase extends BaseUseCase<ProsConsResponse> {
    #url = environment.apis.gpt.prosConsStream;

    execute(prompt: string, abortController: AbortController): Observable<string> {
        return new Observable<string>((observer) => {
            let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

            const cleanup = () => {
                if (reader) {
                    reader.cancel().catch(console.error);
                }
            };

            fetch(this.#url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
                signal: abortController.signal,
            })
                .then(async (resp) => {
                    if (!resp.ok) {
                        throw new Error(`HTTP error! status: ${resp.status} - ${resp.statusText}`);
                    }
                    if (!resp.body) {
                        throw new Error('Response body is null');
                    }

                    reader = resp.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';

                    try {
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;

                            const chunk = decoder.decode(value, { stream: true });
                            buffer += chunk;

                            let result = JSON.parse(JSON.stringify(buffer));
                            this.#addGptMessage(result);
                            buffer = '';

                            observer.next(chunk);
                        }
                        observer.complete();
                    } catch (error) {
                        throw error;
                    }
                })
                .catch((error: Error) => {
                    console.error('[ProsConsStreamUseCase] Error:', error.message);
                    observer.error(error);
                })
                .finally(cleanup);

            return cleanup;
        });
    }

    #addGptMessage(response: ProsConsStreamResponse): void {
        this.state.prosConsStreamMessage = {
            isGpt: true,
            infoGpt: response,
        };
    }
}
