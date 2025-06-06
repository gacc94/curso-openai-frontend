import { Injectable, signal } from '@angular/core';
import {
    MenuItemState,
    AppState,
    OrthographyMessageState,
    ProsConsMessageState,
    TranslateMessageState,
    IStateService,
    TextToAudioMessageState,
    ImageGenerateMessageState,
} from '../interfaces/';
import { ProsConsStreamMessageState } from '../interfaces/pros-cons-stream.state';
import { MathSolveProblemMessageState } from '../interfaces/math-solve-problems.state';

@Injectable({
    providedIn: 'root',
})
export class StateService implements IStateService {
    readonly #state = signal<AppState>({
        menuItems: [],
        orthographyMessages: [],
        prosConsMessages: [],
        prosConsStreamMessage: [],
        translateMessages: [],
        textToAudioMessages: [],
        imageGenerateMessages: [],
        mathSolveProblemsMessages: [],
    });

    set menuItems(items: MenuItemState[]) {
        this.#state.update((state: AppState) => ({
            ...state,
            menuItems: items,
        }));
    }

    get menuItems(): MenuItemState[] {
        return this.#state().menuItems;
    }

    set orthographyMessage(message: OrthographyMessageState) {
        this.#state.update((state: AppState) => ({
            ...state,
            orthographyMessages: [...state.orthographyMessages, message],
        }));
    }

    get orthographyMessages(): OrthographyMessageState[] {
        return this.#state().orthographyMessages;
    }

    set prosConsMessage(message: ProsConsMessageState) {
        this.#state.update((state: AppState) => ({
            ...state,
            prosConsMessages: [...state.prosConsMessages, message],
        }));
    }

    get prosConsMessages(): ProsConsMessageState[] {
        return this.#state().prosConsMessages;
    }

    set prosConsStreamMessage(prosConsStream: ProsConsStreamMessageState) {
        this.#state.update((state: AppState) => {
            const messages = state.prosConsStreamMessage;
            const lastMessage = messages.at(-1);

            if (!prosConsStream.isGpt || !lastMessage?.infoGpt) {
                return {
                    ...state,
                    prosConsStreamMessage: [...messages, prosConsStream],
                };
            }

            messages.pop();
            return {
                ...state,
                prosConsStreamMessage: [
                    ...messages,
                    {
                        isGpt: true,
                        infoGpt: lastMessage.infoGpt + prosConsStream.infoGpt,
                    },
                ],
            };
        });
    }

    get prosConsStreamMessages(): ProsConsStreamMessageState[] {
        return this.#state().prosConsStreamMessage;
    }

    set translateMessage(message: TranslateMessageState) {
        this.#state.update((state: AppState) => ({
            ...state,
            translateMessages: [...state.translateMessages, message],
        }));
    }

    get translateMessages(): TranslateMessageState[] {
        return this.#state().translateMessages;
    }

    set textToAudioMessage(textToAudio: TextToAudioMessageState) {
        this.#state.update((state: AppState) => ({
            ...state,
            textToAudioMessages: [...state.textToAudioMessages, textToAudio],
        }));
    }

    get textToAudioMessages(): TextToAudioMessageState[] {
        return this.#state().textToAudioMessages;
    }

    set imageGenerateMessage(imageGenerate: ImageGenerateMessageState) {
        this.#state.update((state: AppState) => ({
            ...state,
            imageGenerateMessages: [...state.imageGenerateMessages, imageGenerate],
        }));
    }

    get imageGenerateMessages() {
        return this.#state().imageGenerateMessages;
    }

    set mathSolveProblemsMessage(mathSolveProblem: MathSolveProblemMessageState) {
        this.#state.update((state: AppState) => ({
            ...state,
            mathSolveProblemsMessages: [...state.mathSolveProblemsMessages, mathSolveProblem],
        }));
    }

    get mathSolveProblemsMessages() {
        return this.#state().mathSolveProblemsMessages;
    }
}
