import { Component, inject, signal } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';

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

    messages = signal<Message[]>([]);
    isLoading = signal<boolean>(false);

    handleMessage(prompt: string) {
        if (!prompt.trim()) return;

        this.isLoading.set(true);
        this.addUserMessage(prompt);

        this.#openAiService.getOrthographyCheck(prompt).subscribe({
            next: (response) => {
                if (!response) throw new Error('No response from service');
                this.addGptMessage(response);
            },
            error: (error) => {
                console.error('Error in orthography check:', error);
            },
            complete: () => {
                this.isLoading.set(false);
            },
        });
    }

    private addUserMessage(text: string) {
        this.messages.update((messages) => [
            ...messages,
            { isGpt: false, text },
        ]);
    }

    private addGptMessage(response: OrthographyResponse) {
        const { correctedText, errors, message, userScore } = response;
        this.messages.update((messages) => [
            ...messages,
            {
                isGpt: true,
                text: response.message,
                info: response,
            },
        ]);
    }
}
