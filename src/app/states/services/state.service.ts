import { Injectable, signal } from '@angular/core';
import { MenuItemState, AppState } from '../interfaces/';

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
}
