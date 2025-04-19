import { Component, linkedSignal, signal } from '@angular/core';
import { ChatMessageComponent } from '@/app/views/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@/app/views/components/chat-bubbles/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageBoxFileComponent } from '../../components/text-message-box-file/text-message-box-file.component';
import { BasePagesComponent } from '@/app/shared/components/base-page.component';
import { defer, EMPTY, finalize, Observable, pipe, takeUntil } from 'rxjs';
import { TextMessageEvent } from '@/app/interfaces';
import { MathSolveProblemsResponse } from '@/app/services/interfaces';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-math-solve-problems',
    imports: [ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxFileComponent],
    templateUrl: './math-solve-problems.component.html',
})
export default class MathSolveProblemsComponent extends BasePagesComponent {
    messages$: Observable<MathSolveProblemsResponse> = EMPTY;
    messages = linkedSignal(() => this.state.mathSolveProblemsMessages);
    isLoading = signal<boolean>(false);

    async handleMessage(messageEvent: TextMessageEvent): Promise<void> {
        const { prompt, file } = messageEvent;
        this.isLoading.set(true);
        const imageUrl = await this.utils.fileToBase64(file);
        this.addUserMessage(prompt!, 'mathSolveProblemsMessage', imageUrl);
        // this.messages$ = this.openaiService.getMathSolveProblems(file!, prompt!);
        this.openaiService
            .getMathSolveProblems(file!, prompt!)
            .pipe(
                takeUntilDestroyed(this.destrofRef),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe();
    }
}
