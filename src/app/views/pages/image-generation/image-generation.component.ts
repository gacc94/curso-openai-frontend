import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '../../components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '../../components/typing-loader/typing-loader.component';
import { TextMessageBoxSelectComponent } from '../../components/text-message-box-select/text-message-box-select.component';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { TextMessageEvent } from '@/app/interfaces';
import { finalize } from 'rxjs';
import { TextMessageBoxComponent } from '../../components/text-message-box/text-message-box.component';

@Component({
    selector: 'app-image-generation',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent],
    templateUrl: './image-generation.component.html',
})
export default class ImageGenerationComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.imageGenerateMessages);
    isLoading = signal<boolean>(false);

    handleMessage(prompt: string): void {
        this.isLoading.set(true);
        this.addUserMessage(prompt!, 'imageGenerateMessage');
        this.openaiService
            .getImageGenerate(prompt)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }
}
