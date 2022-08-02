import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  setItemToLocalStorage(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getItemFromLocalStorage(name: string): any {
    return JSON.parse(localStorage.getItem(name) || '');
  }

  checkItemFromLocalStorage(name: string): boolean {
    return !!localStorage.getItem(name);
  }
  removeItemFromLocalStorage(name: string): any {
    localStorage.removeItem(name);
  }
}
