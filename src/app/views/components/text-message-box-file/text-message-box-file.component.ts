import { TextMessageEvent } from '@/app/interfaces';
import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-text-message-box-file',
    imports: [ReactiveFormsModule],
    templateUrl: './text-message-box-file.component.html',
})
export class TextMessageBoxFileComponent {
    placeholder = input<string>('');
    onMessage = output<TextMessageEvent>();
    file: File | undefined;

    fb = inject(FormBuilder);
    form = this.fb.group({
        prompt: [],
        file: [null, [Validators.required]],
    });

    handleSelectedFile(event: any) {
        const file = event.target.files.item(0);
        this.form.controls.file.setValue(file);
    }

    handleSubmit() {
        if (this.form.invalid) return;

        const { prompt, file } = this.form.value;

        this.onMessage.emit({ prompt: prompt!, file: file! });
        this.form.reset();
    }
}
