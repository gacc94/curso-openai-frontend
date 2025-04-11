import { OptionSelect, TextMessageEvent } from '@/app/interfaces';
import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-text-message-box-select',
    imports: [ReactiveFormsModule],
    templateUrl: './text-message-box-select.component.html',
})
export class TextMessageBoxSelectComponent {
    placeholder = input<string>('');
    options = input.required<OptionSelect[]>();
    onMessage = output<TextMessageEvent>();

    fb = inject(FormBuilder);
    form = this.fb.group({
        prompt: ['', Validators.required],
        selectedOption: ['', Validators.required],
    });

    handleSubmit() {
        if (this.form.invalid) return;

        const { prompt, selectedOption } = this.form.getRawValue();

        this.onMessage.emit({
            prompt: prompt!,
            selectedOption: selectedOption!,
        });
        this.form.reset();
    }
}
