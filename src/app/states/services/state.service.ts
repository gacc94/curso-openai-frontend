import { Injectable, signal } from '@angular/core';
import {
    MenuItemState,
    AppState,
    OrthographyMessageState,
    ProsConsMessageState,
} from '../interfaces/';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    #state = signal<AppState>({
        menuItems: [],
        orthographyMessages: [],
        prosConsMessages: [],
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
}
