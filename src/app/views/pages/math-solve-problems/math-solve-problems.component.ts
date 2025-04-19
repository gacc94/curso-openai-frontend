import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '@/app/views/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@/app/views/components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxFileComponent } from '../../components/text-message-box-file/text-message-box-file.component';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { finalize } from 'rxjs';
import { TextMessageEvent } from '@/app/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageMathComponent } from '../../components/chat-bubbles/message-math/message-math.component';

@Component({
    selector: 'app-math-solve-problems',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxFileComponent, MessageMathComponent],
    templateUrl: './math-solve-problems.component.html',
})
export default class MathSolveProblemsComponent extends BasePagesComponent {
    messages = linkedSignal(() => this.state.mathSolveProblemsMessages);
    isLoading = signal<boolean>(false);

    async handleMessage(messageEvent: TextMessageEvent): Promise<void> {
        const { prompt, file } = messageEvent;
        this.isLoading.set(true);
        const imageUrl = await this.utils.fileToBase64(file);
        this.addUserMessage(prompt!, 'mathSolveProblemsMessage', imageUrl);
        this.openaiService
            .getMathSolveProblems(file!, prompt!)
            .pipe(
                takeUntilDestroyed(this.destrofRef),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe();
    }
}
