import { Injectable, signal } from '@angular/core';
import { IStateApp } from '../interfaces/state.interface';
import { MenuItem } from '../interfaces/menu-items.interface';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    #state = signal<IStateApp>({
        menuItems: [],
    });

    set menuItems(items: MenuItem[]) {
        this.#state.update((state) => ({ ...state, menuItems: items }));
    }

    get menuItems(): MenuItem[] {
        return this.#state().menuItems;
    }
}
