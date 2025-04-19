import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BaseUseCase } from './base.usecase';
import { MathSolveProblemsResponse } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class MathSolveProblemsUseCase extends BaseUseCase<MathSolveProblemsResponse> {
    #url = environment.apis.math.solveProblem;

    execute(file: File, prompt: string, level?: string): Observable<MathSolveProblemsResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('prompt', prompt);

        if (level) formData.append('level', level);

        return this.http.post<MathSolveProblemsResponse>(this.#url, formData).pipe(
            tap((response) => {
                this.addGptMessage(response, 'mathSolveProblemsMessage');
            })
        );
    }
}
