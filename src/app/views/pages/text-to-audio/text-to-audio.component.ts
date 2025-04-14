import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxSelectComponent } from '../../components/text-message-box-select/text-message-box-select.component';
import { OptionSelect, TextMessageEvent } from '@/app/interfaces';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-text-to-audio',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxSelectComponent],
    templateUrl: './text-to-audio.component.html',
})
export default class TextToAudioComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.textToAudioMessages);
    isLoading = signal<boolean>(false);

    languages: OptionSelect[] = [
        { id: 'nova', text: 'Nova' },
        { id: 'alloy', text: 'Alloy' },
        { id: 'echo', text: 'Echo' },
        { id: 'fable', text: 'Fable' },
        { id: 'onyx', text: 'Onyx' },
        { id: 'shimmer', text: 'Shimmer' },
    ];

    handleMessage(messageEvt: TextMessageEvent): void {
        const { prompt, selectedOption } = messageEvt;
        this.isLoading.set(true);
        this.addUserMessage(prompt!, 'textToAudioMessage');

        this.openaiService
            .getTextToAudio(prompt!, selectedOption!)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }
}
