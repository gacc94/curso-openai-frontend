import { Component, inject, linkedSignal, signal } from '@angular/core';
import { MyMessageComponent } from '@/app/views/components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageBoxFileComponent } from '@components/text-message-box-file/text-message-box-file.component';
import { TextMessageBoxSelectComponent } from '@components/text-message-box-select/text-message-box-select.component';
import { Message } from '@interfaces/index';
import { OpenAiService } from '@services/openai.service';
import { ChatMessageComponent } from '@/app/views/components/chat-bubbles/chat-message/chat-message.component';
import { MessageOrthographyComponent } from '../../components/chat-bubbles/message-orthography/message-orthography.component';
import { OrthographyResponse } from '@/app/services/interfaces/orthography.interface';
import { finalize, firstValueFrom } from 'rxjs';
import { StateService } from '@/app/states/services/state.service';

@Component({
    selector: 'app-orthography',
    imports: [
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        // TextMessageBoxFileComponent,
        // TextMessageBoxSelectComponent,
        MessageOrthographyComponent,
    ],
    templateUrl: './orthography.component.html',
})
export default class OrthographyComponent {
    #openAiService = inject(OpenAiService);
    #state = inject(StateService);

    messages = linkedSignal(() => this.#state.orthographyMessages);
    isLoading = signal<boolean>(false);

    handleMessage(prompt: string): void {
        if (!prompt.trim()) return;

        this.isLoading.set(true);
        this.#addUserMessage(prompt);

        this.#openAiService
            .getOrthographyCheck(prompt)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response) => {
                    this.#addGptMessage(response);
                },
            });
    }

    #addUserMessage(text: string) {
        this.#state.orthographyMessage = {
            isGpt: false,
            infoUser: {
                text,
            },
        };
    }

    #addGptMessage(response: OrthographyResponse) {
        this.#state.orthographyMessage = {
            isGpt: true,
            infoGpt: response,
        };
    }
}
