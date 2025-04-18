import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '@/app/views/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@/app/views/components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageBoxFileComponent } from '../../components/text-message-box-file/text-message-box-file.component';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-math-solve-problems',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageBoxFileComponent],
    templateUrl: './math-solve-problems.component.html',
})
export default class MathSolveProblemsComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.orthographyMessages);
    isLoading = signal<boolean>(false);

    handleMessage(prompt: any): void {
        if (!prompt.trim()) return;

        this.isLoading.set(true);
        this.addUserMessage(prompt, 'imageGenerateMessage');

        this.openaiService
            .getOrthographyCheck(prompt)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe();
    }
}
