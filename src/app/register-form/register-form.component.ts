import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class RegisterFormComponent {

  public formGroup: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  submit() {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.authService.register(this.formGroup.get('email')?.value, this.formGroup.get('username')?.value, this.formGroup.get('password')?.value).then(res => {
        this.toastr.success("Logge dich nun ein.", "Du wurdest registriert!");
        this.authService.toggleView();

      });

    }
  }

}
