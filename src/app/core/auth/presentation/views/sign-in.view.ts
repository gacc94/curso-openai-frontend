import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '../../application/auth.facade';

@Component({
    selector: 'app-sign-in-view',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './sign-in.view.html',
    styleUrls: ['./sign-in.view.scss'],
})
export default class SignInView {
    private fb = inject(FormBuilder);
    private authFacade = inject(AuthFacade);
    private router = inject(Router);

    public myForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    public isLoading = false;
    public errorMessage: string | null = null;

    onSubmit() {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const { email, password } = this.myForm.value;

        this.authFacade.login(email, password).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigateByUrl('/gpt');
            },
            error: (message) => {
                this.isLoading = false;
                this.errorMessage = message;
            },
        });
    }

    loginWithGoogle() {
        this.isLoading = true;
        this.errorMessage = null;

        this.authFacade.loginWithGoogle().subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigateByUrl('/gpt');
            },
            error: (message) => {
                this.isLoading = false;
                this.errorMessage = message;
            },
        });
    }
}
