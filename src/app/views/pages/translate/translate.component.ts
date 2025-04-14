import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../components/text-message-box/text-message-box.component';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { finalize } from 'rxjs';
import { OptionSelect, TextMessageEvent } from '@/app/interfaces';
import { TextMessageBoxSelectComponent } from '../../components/text-message-box-select/text-message-box-select.component';

@Component({
    selector: 'app-translate',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxSelectComponent],
    templateUrl: './translate.component.html',
})
export default class TranslateComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.translateMessages);
    isLoading = signal<boolean>(false);

    languages: OptionSelect[] = [
        { id: 'alemán', text: 'Alemán' },
        { id: 'árabe', text: 'Árabe' },
        { id: 'bengalí', text: 'Bengalí' },
        { id: 'francés', text: 'Francés' },
        { id: 'hindi', text: 'Hindi' },
        { id: 'inglés', text: 'Inglés' },
        { id: 'japonés', text: 'Japonés' },
        { id: 'mandarín', text: 'Mandarín' },
        { id: 'portugués', text: 'Portugués' },
        { id: 'ruso', text: 'Ruso' },
    ];

    handleMessage(messageEvt: TextMessageEvent): void {
        const { prompt, selectedOption } = messageEvt;
        this.isLoading.set(true);
        this.addUserMessage(prompt!, 'translateMessage');

        this.openaiService
            .getTranslate(prompt!, selectedOption!)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }
}
