import { MessageInfo } from '@/app/interfaces';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-message-orthography',
    imports: [],
    templateUrl: './message-orthography.component.html',
})
export class MessageOrthographyComponent {
    infoMessage = input.required<MessageInfo>();
}
