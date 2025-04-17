import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export default class SignInComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
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

        this.authService.login({ email, password }).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigateByUrl('/');
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
                this.router.navigateByUrl('/');
            },
            error: (message) => {
                this.isLoading = false;
                this.errorMessage = message;
            },
        });
    }

    loginWithGithub() {
        this.isLoading = true;
        this.errorMessage = null;

        this.authService.loginWithGithub().subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigateByUrl('/');
            },
            error: (message) => {
                this.isLoading = false;
                this.errorMessage = message;
            },
        });
    }
}
