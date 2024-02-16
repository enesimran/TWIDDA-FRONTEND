import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule,]
})
export class LoginFormComponent {

  public formGroup: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  submit() {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.authService.login(this.formGroup.get('email')?.value, this.formGroup.get('password')?.value).then(res => {
        this.toastr.success("Du wurdest eingeloggt!");
        localStorage.setItem('token', res.token);
        this.authService.getAuth();
        this.router.navigate(['/home']);
      });

    }
  }

}
