import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-mgt';

  $isLoggedIn = this._authService.isLoggedIn$;

  constructor(private route: Router, private _authService: AuthService) {
 
  }

  public onSignOut(): void {
    this._authService.signOut();
    this.route.navigate(['login']);
  }
}
