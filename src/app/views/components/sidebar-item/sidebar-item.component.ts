import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItemState } from '../../../states/interfaces/menu-items.state';

@Component({
    selector: 'app-sidebar-item',
    imports: [RouterModule],
    template: `
        @let item = menuItem();
        <a
            [routerLink]="item.path"
            routerLinkActive="bg-gray-800"
            class="flex justify-content-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors duration-200"
        >
            <i class=" text-2xl mr-4 text-indigo-400" [class]="item.data.icon"></i>
            <div class="flex flex-col flex-grow">
                <span class="text-white text-sm font-semibold">{{ item.data.title }}</span>
                <span class="text-gray-400 text-sm">{{ item.data.description }}</span>
            </div>
        </a>
    `,
})
export class SidebarItemComponent {
    menuItem = input.required<MenuItemState>({ alias: 'item' });
}
