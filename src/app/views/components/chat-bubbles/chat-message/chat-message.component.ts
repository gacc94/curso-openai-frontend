import { MessageInfo } from '@/app/interfaces';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-chat-message',
    imports: [],
    templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent {
    text = input.required<string>();
}
