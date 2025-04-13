import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../components/text-message-box/text-message-box.component';
import { OpenAiService } from '@/app/services/openai.service';
import { StateService } from '@/app/states/services/state.service';
import { finalize } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-pros-cons-stream',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, MarkdownModule],
    templateUrl: './pros-cons-stream.component.html',
})
export default class ProsConsStreamComponent {
    #openAiService = inject(OpenAiService);
    #state = inject(StateService);

    messages = linkedSignal(() => this.#state.prosConsStreamMessages);
    message = signal('');
    isLoading = signal<boolean>(false);

    #abortController = new AbortController();

    handleMessage(prompt: string): void {
        this.isLoading.set(true);
        this.#addUserMessage(prompt);

        this.#openAiService
            .getProsConsStream(prompt, this.#abortController)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (messageRes) => {
                    console.log(this.messages());
                },
            });
    }

    #addUserMessage(text: string) {
        this.#state.prosConsStreamMessage = {
            isGpt: false,
            infoUser: {
                text,
            },
        };
    }
}
