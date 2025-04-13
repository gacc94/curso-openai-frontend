import { MenuItemState } from './menu-items.state';
import { OrthographyMessageState } from './orthography.state';
import { ProsConsMessageState } from './pros-cons.state';

export interface AppState {
    menuItems: MenuItemState[];
    orthographyMessages: OrthographyMessageState[];
    prosConsMessages: ProsConsMessageState[];
}
