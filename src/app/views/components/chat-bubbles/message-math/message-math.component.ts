import { MathSolveProblemInfo } from '@/app/states/interfaces/math-solve-problems.state';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { LatexParagraphComponent } from '../../latex-paragraph/latex-paragraph.component';

@Component({
    selector: 'app-message-math',
    standalone: true,
    imports: [CommonModule, LatexParagraphComponent, NgIf, NgFor, NgClass],
    templateUrl: './message-math.component.html',
    styleUrl: `./message-math.component.scss`,
})
export class MessageMathComponent {
    infoGpt = input.required<MathSolveProblemInfo>();

    // Estado para el modal
    modalVisible = signal(false);
    currentFormula = signal('');

    addLatexDelimiters(latex: string): string {
        return `$$${latex}$$`;
    }

    /**
     * Muestra el modal con la fórmula ampliada
     */
    showFormulaModal(formula: string): void {
        this.currentFormula.set(formula);
        this.modalVisible.set(true);
        // Prevenir scroll del body cuando el modal está abierto
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra el modal
     */
    closeModal(): void {
        this.modalVisible.set(false);
        // Restaurar scroll
        document.body.style.overflow = 'auto';
    }

    /**
     * Devuelve una clase CSS según el nivel de dificultad
     */
    getDifficultyClass(nivel: string): string {
        switch (nivel) {
            case 'Básico':
                return 'bg-green-900/40 text-green-300';
            case 'Intermedio':
                return 'bg-yellow-900/40 text-yellow-300';
            case 'Avanzado':
                return 'bg-red-900/40 text-red-300';
            default:
                return 'bg-gray-900/40 text-gray-300';
        }
    }
}
