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

    messages = linkedSignal(() => this.#state.prosConsMessages);
    message = signal('');
    isLoading = signal<boolean>(false);

    handleMessage(prompt: string): void {
        this.isLoading.set(true);
        this.#addUserMessage(prompt);

        this.#openAiService.getProsConsStream(prompt).subscribe({
            next: (messageRes) => {
                console.log('message', messageRes);
                this.message.update((message) => {
                    return message + messageRes;
                });
            },
        });
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
