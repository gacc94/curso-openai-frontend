import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '@/app/views/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@/app/views/components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageBoxFileComponent } from '../../components/text-message-box-file/text-message-box-file.component';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { defer, finalize, pipe } from 'rxjs';
import { TextMessageEvent } from '@/app/interfaces';

@Component({
    selector: 'app-math-solve-problems',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxFileComponent],
    templateUrl: './math-solve-problems.component.html',
})
export default class MathSolveProblemsComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.mathSolveProblemsMessages);
    isLoading = signal<boolean>(false);

    async handleMessage(prompt: TextMessageEvent): Promise<void> {
        this.isLoading.set(true);
        const imageUrl = await this.utils.fileToBase64(prompt.file);
        this.addUserMessage(prompt.prompt!, 'mathSolveProblemsMessage', imageUrl);

        // this.openaiService
        //     .getOrthographyCheck(prompt)
        //     .pipe(finalize(() => this.isLoading.set(false)))
        //     .subscribe();
    }
}
