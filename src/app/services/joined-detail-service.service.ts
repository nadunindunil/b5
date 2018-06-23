import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class JoinedDetailServiceService {
  // users : User[];
  // currentUser : User;
  currentUser: Observable<User>;

  private currentUserSubject: BehaviorSubject<User>;

  constructor() {
    // this.users = [];
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')) || null);
  }

  public changeCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }

  public addUser(user: User): void {
    const users = this.getPersistUsers() || [];
    users.push(user);
    this.setUsersPersist(users);
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getUsers(): User[] {
    return this.getPersistUsers();
  }

  public setUsersPersist(users): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getPersistUsers(): User[] {
    return JSON.parse(localStorage.getItem('users'));
  }

  public clearUserData(): void {
    localStorage.setItem('users', JSON.stringify(null));
    localStorage.setItem('currentUser', JSON.stringify(null));
    localStorage.setItem('userData', JSON.stringify({ isLoggedIn: false }));
  }
}
