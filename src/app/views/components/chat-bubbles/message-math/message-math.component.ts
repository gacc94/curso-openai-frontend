import { MathSolveProblemInfo } from '@/app/states/interfaces/math-solve-problems.state';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-message-math',
    imports: [CommonModule],
    templateUrl: './message-math.component.html',
})
export class MessageMathComponent {
    mesaage = input.required<MathSolveProblemInfo>();
}
