import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '../../components/text-message-box/text-message-box.component';
import { OpenAiService } from '@/app/services/openai.service';
import { StateService } from '@/app/states/services/state.service';
import { finalize } from 'rxjs';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';

@Component({
    selector: 'app-pros-const',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent],
    templateUrl: './pros-const.component.html',
})
export default class ProsConstComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.prosConsMessages);
    isLoading = signal<boolean>(false);

    handleMessage(prompt: string): void {
        this.isLoading.set(true);
        this.addUserMessage(prompt, 'prosConsMessage');

        this.openaiService
            .getProsCons(prompt)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }
}
