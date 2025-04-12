import { MenuItemState } from './menu-items.state';
import { OrthographyMessageState } from './orthography.state';

export interface AppState {
    menuItems: MenuItemState[];
    orthographyMessages: OrthographyMessageState[];
}
