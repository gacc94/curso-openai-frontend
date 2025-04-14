import { MenuItemState } from './menu-items.state';
import { OrthographyMessageState } from './orthography.state';
import { ProsConsStreamMessageState } from './pros-cons-stream.state';
import { ProsConsMessageState } from './pros-cons.state';
import { TextToAudioMessageState } from './text-to-audio.state';
import { TranslateMessageState } from './translate.state';

export interface AppState {
    menuItems: MenuItemState[];
    orthographyMessages: OrthographyMessageState[];
    prosConsMessages: ProsConsMessageState[];
    prosConsStreamMessage: ProsConsStreamMessageState[];
    translateMessages: TranslateMessageState[];
    textToAudioMessages: TextToAudioMessageState[];
}

export interface IStateService {
    orthographyMessage: OrthographyMessageState;
    prosConsMessage: ProsConsMessageState;
    prosConsStreamMessage: ProsConsStreamMessageState;
    translateMessage: TranslateMessageState;
    textToAudioMessage: TextToAudioMessageState;
}
