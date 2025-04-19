import { TextMessageEvent } from '@/app/interfaces';
import { UtilsService } from '@/app/services/utils.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, input, output, signal, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-text-message-box-file',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './text-message-box-file.component.html',
})
export class TextMessageBoxFileComponent {
    placeholder = input<string>('');
    #utilService = inject(UtilsService);
    onMessage = output<TextMessageEvent>();
    file: File | undefined;
    previewUrl = signal<string | undefined>(undefined);

    fileInput = viewChild.required<ElementRef>('fileInput');

    fb = inject(FormBuilder);
    form = this.fb.group({
        prompt: new FormControl<string | null>(null, [Validators.required]),
        file: new FormControl<File | null>(null, [Validators.required]),
    });

    async handleSelectedFile(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files.item(0);
            this.form.controls.file.setValue(file);

            if (file && file.type.startsWith('image/')) {
                this.previewUrl.set(await this.#utilService.fileToBase64(file));
            } else {
                this.previewUrl.set(undefined);
            }
        } else {
            this.form.controls.file.setValue(null);
            this.previewUrl.set(undefined);
        }
    }

    clearFile() {
        this.form.controls.file.setValue(null);
        this.previewUrl.set(undefined);
        this.fileInput().nativeElement.value = '';
    }

    handleSubmit() {
        if (this.form.invalid) return;

        const { prompt, file } = this.form.value;

        this.onMessage.emit({ prompt: prompt!, file: file! });
        this.form.reset();
        this.previewUrl.set(undefined);
    }
}
