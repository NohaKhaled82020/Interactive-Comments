import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  currentUser$ = new BehaviorSubject<any>('');
  showBox$ = new BehaviorSubject<any>('');

  comments$ = new BehaviorSubject<any>('');
}
