import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  protected form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private _authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  protected onSign(): void {
    const { username, password } = this.form.value;
    if (username === '1620' && password === 'Password09') {
      this._authService.signIn(username, password);
      if (this._authService.isSignedIn()) {
        this.router.navigate(['employee']);
      }
    } else {
      alert('Username or password incorrect!')
    }
  }
  
}
