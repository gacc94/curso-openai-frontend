import { Injectable, signal } from '@angular/core';
import {
    MenuItemState,
    AppState,
    OrthographyMessageState,
} from '../interfaces/';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    #state = signal<AppState>({
        menuItems: [],
        orthographyMessages: [],
    });

    set menuItems(items: MenuItemState[]) {
        this.#state.update((state) => ({ ...state, menuItems: items }));
    }

    get menuItems(): MenuItemState[] {
        return this.#state().menuItems;
    }

    set orthographyMessage(message: OrthographyMessageState) {
        this.#state.update((state) => ({
            ...state,
            orthographyMessages: [...state.orthographyMessages, message],
        }));
    }

    get orthographyMessages() {
        return this.#state().orthographyMessages;
    }
}
