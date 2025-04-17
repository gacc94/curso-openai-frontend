import { Component } from '@angular/core';

@Component({
    selector: 'app-typing-loader',
    imports: [],
    template: `
        <div class="typing-container">
            <div class="typing-content">
                <div class="typing-bubble">
                    <div class="typing-dots">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="typing-text">AngularGPT está escribiendo...</div>
                </div>
            </div>
        </div>
    `,
    styleUrl: './typing-loader.component.scss',
})
export class TypingLoaderComponent {}
