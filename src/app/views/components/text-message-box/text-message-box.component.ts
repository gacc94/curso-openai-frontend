import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-text-message-box',
    imports: [ReactiveFormsModule],
    templateUrl: './text-message-box.component.html',
})
export class TextMessageBoxComponent {
    placeholder = input<string>('');
    disableCorrections = input<boolean>(false);
    onMessage = output<string>();

    fb = inject(FormBuilder);
    form = this.fb.group({
        prompt: ['', Validators.required],
    });

    handleSubmit() {
        if (this.form.invalid) return;

        const { prompt } = this.form.value;
        console.log({ prompt });

        this.onMessage.emit(prompt ?? '');
        this.form.reset();
    }
}
