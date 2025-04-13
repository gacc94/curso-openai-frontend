import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../components/text-message-box/text-message-box.component';
import { OpenAiService } from '@/app/services/openai.service';
import { StateService } from '@/app/states/services/state.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-pros-const',
    imports: [
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
    ],
    templateUrl: './pros-const.component.html',
})
export default class ProsConstComponent {
    #openAiService = inject(OpenAiService);
    #state = inject(StateService);

    messages = linkedSignal(() => this.#state.prosConsMessages);
    isLoading = signal<boolean>(false);

    handleMessage(prompt: string): void {
        if (!prompt.trim()) return;

        this.isLoading.set(true);
        this.#addUserMessage(prompt);

        this.#openAiService
            .getProsCons(prompt)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }

    #addUserMessage(text: string) {
        this.#state.prosConsMessage = {
            isGpt: false,
            infoUser: {
                text,
            },
        };
    }
}
