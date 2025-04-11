import { inject, Injectable } from '@angular/core';
import { MenuItem } from '../states/interfaces/menu-items.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    #router = inject(Router);

    getMenuItems(): MenuItem[] {
        const homeRoute = this.#router.config.find(
            (route) => route.path === ''
        );
        if (!homeRoute?.children) return [];

        return homeRoute.children
            .filter((route) => route.data && route.path !== '**')
            .map(({ path, data }) => ({
                path: path!,
                data: data as MenuItem['data'],
            }));
    }
}
