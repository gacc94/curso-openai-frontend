import { Injectable, signal } from '@angular/core';
import { MenuItemState, AppState, OrthographyMessageState, ProsConsMessageState } from '../interfaces/';
import { ProsConsStreamMessageState } from '../interfaces/pros-cons-stream.state';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    readonly #state = signal<AppState>({
        menuItems: [],
        orthographyMessages: [],
        prosConsMessages: [],
        prosConsStreamMessage: [],
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
}
