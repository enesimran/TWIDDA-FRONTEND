import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.css'],
  standalone: true,
  imports: [NgIf, RegisterFormComponent, LoginFormComponent]
})
export class AuthpageComponent {

  constructor(public authService: AuthService) {}




}
