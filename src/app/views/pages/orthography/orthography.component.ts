import { Component, inject, signal } from '@angular/core';
import { MyMessageComponent } from '@components/my-message/my-message.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { TextMessageBoxComponent } from '@components/text-message-box/text-message-box.component';
import { TextMessageBoxFileComponent } from '@components/text-message-box-file/text-message-box-file.component';
import { TextMessageBoxSelectComponent } from '@components/text-message-box-select/text-message-box-select.component';
import { Message } from '@interfaces/index';
import { OpenAiService } from '@services/openai.service';
import { ChatMessageComponent } from '@components/chat-message/chat-message.component';

@Component({
    selector: 'app-orthography',
    imports: [
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        // TextMessageBoxComponent,
        TextMessageBoxFileComponent,
        TextMessageBoxSelectComponent,
    ],
    templateUrl: './orthography.component.html',
})
export default class OrthographyComponent {
    #openAiService = inject(OpenAiService);

    messages = signal<Message[]>([]);
    isLoading = signal<boolean>(false);

    handleMessage(message: any) {
        console.log('Message sent:', message);
    }
}
