import { Component } from '@angular/core';

@Component({
    selector: 'app-typing-loader',
    imports: [],
    template: `
        <div class="typing">
            <span class="circle scaling"></span>
            <span class="circle scaling"></span>
            <span class="circle scaling"></span>
        </div>
    `,
    styleUrl: './typing-loader.component.scss',
})
export class TypingLoaderComponent {}
