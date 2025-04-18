import { inject, Injectable } from '@angular/core';
import { MenuItemState } from '../states/interfaces/menu-items.state';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UtilsService {
    #router = inject(Router);

    getMenuItems(): MenuItemState[] {
        const homeRoute = this.#router.config.find((route) => route.path === 'gpt');
        if (!homeRoute?.children) return [];

        return homeRoute.children
            .filter((route) => route.data && route.path !== '**')
            .map(({ path, data }) => ({
                path: path!,
                data: data as MenuItemState['data'],
            }));
    }

    fileToBase64(file?: File): Promise<string | undefined> {
        if (!file) return Promise.resolve(undefined);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
}
