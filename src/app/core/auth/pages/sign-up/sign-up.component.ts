import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export default class SignUpComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    public myForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
    }, {
        validators: this.passwordsMatchValidator
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

        const { name, email, password } = this.myForm.value;

        this.authService.register({ name, email, password }).subscribe({
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

        this.authService.loginWithGoogle().subscribe({
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

    private passwordsMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        if (password === confirmPassword) {
            return null;
        }

        return { passwordMismatch: true };
    }
}
