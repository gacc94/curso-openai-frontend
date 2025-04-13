import { MessageInfo } from '@/app/interfaces';
import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-chat-message',
    imports: [MarkdownModule],
    templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent {
    text = input.required<string>();
}
