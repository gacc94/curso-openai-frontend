import { Component, inject, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { extractMath } from 'extract-math';
import katex, { KatexOptions } from 'katex';

@Component({
    selector: 'app-latex-paragraph',
    imports: [],
    templateUrl: './latex-paragraph.component.html',
})
export class LatexParagraphComponent implements OnInit {
    readonly #sanitizer = inject(DomSanitizer);
    content = input.required<string>();
    _html: any = [];
    _safeHtml: SafeHtml | undefined;

    ngOnInit() {
        // Break the string into segments ('text', 'inline', and 'display')
        const segments = extractMath(this.content(), {
            delimiters: {
                inline: ['$', '$'],
                display: ['$$', '$$'],
            },
        });

        // Parse the LaTeX equation to HTML
        for (let i = 0; i < segments.length; i++) {
            const value = this.sanitizeLatex(segments[i]['value']);

            if (segments[i]['type'] === 'text') {
                this._html.push(value);
            } else if (segments[i]['type'] === 'inline') {
                this._html.push(
                    this.renderToString(value, {
                        output: 'mathml',
                        throwOnError: false,
                        displayMode: false,
                    })
                );
            } else if (segments[i]['type'] === 'display') {
                this._html.push(
                    this.renderToString(value, {
                        output: 'mathml',
                        throwOnError: false,
                        displayMode: true,
                    })
                );
            } else {
                console.warn('Tipo de segmento no reconocido:', segments[i]);
            }
        }

        this._safeHtml = this.#sanitizer.bypassSecurityTrustHtml(this._html.join(''));
    }

    renderToString(equation: any, options: KatexOptions): string {
        return katex.renderToString(equation, options);
    }

    sanitizeLatex(input: string): string {
        // Reemplaza doble backslash por uno solo
        return input.replace(/\\\\/g, '\\');
    }
}
