import {
    ChangeDetectionStrategy,
    Component,
    inject,
    linkedSignal,
    signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarItemComponent } from '../../components/sidebar-item/sidebar-item.component';
import { StateService } from '../../../states/services/state.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
    selector: 'app-layout',
    imports: [RouterModule, SidebarItemComponent],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {
    #state = inject(StateService);
    #utilService = inject(UtilsService);

    items = linkedSignal(() => this.#state.menuItems);

    constructor() {
        this.#state.menuItems = this.#utilService.getMenuItems();
    }
}
