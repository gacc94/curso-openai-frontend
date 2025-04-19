import { inject, Injectable } from '@angular/core';
import {
    ImageGenerateUseCase,
    MathSolveProblemsUseCase,
    OrthographyUsecase,
    ProsConsStreamUseCase,
    ProsConsUseCase,
    TextToAudioUseCase,
    TranslateUseCase,
} from './usecases/';
import { Observable } from 'rxjs';
import { OrthographyResponse, ProsConsResponse, TranslateResponse } from './interfaces';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
    #orthographyUseCase = inject(OrthographyUsecase);
    #prosConsUseCase = inject(ProsConsUseCase);
    #prosConsUseStreamCase = inject(ProsConsStreamUseCase);
    #translateUseCase = inject(TranslateUseCase);
    #textToAudioUseCase = inject(TextToAudioUseCase);
    #imageGenerateUseCase = inject(ImageGenerateUseCase);
    #mathSolveProblemsUseCase = inject(MathSolveProblemsUseCase);

    getOrthographyCheck(prompt: string): Observable<OrthographyResponse> {
        return this.#orthographyUseCase.execute(prompt);
    }

    getProsCons(prompt: string): Observable<ProsConsResponse> {
        return this.#prosConsUseCase.execute(prompt);
    }

    getProsConsStream(prompt: string, abortController: AbortController) {
        return this.#prosConsUseStreamCase.execute(prompt, abortController);
    }

    getTranslate(prompt: string, lang: string): Observable<TranslateResponse> {
        return this.#translateUseCase.execute(prompt, lang);
    }

    getTextToAudio(prompt: string, voice: string) {
        return this.#textToAudioUseCase.execute(prompt, voice);
    }

    getImageGenerate(prompt: string) {
        return this.#imageGenerateUseCase.execute(prompt);
    }

    getMathSolveProblems(file: File, prompt: string, level?: string) {
        return this.#mathSolveProblemsUseCase.execute(file, prompt, level);
    }
}
