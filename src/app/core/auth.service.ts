import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() { }

  public isSignedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  public signIn(username: string, password: string): void {
    sessionStorage.setItem('token', JSON.stringify(username + password));
    this.isLoggedIn.next(this.isSignedIn());
  }

  public signOut(): void {
    this.isLoggedIn.next(false);
    this.isLoggedIn.complete();
    sessionStorage.clear();
  }
}
