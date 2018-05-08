import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  signup(userData) {
    return this.http.post(`${environment.api_base}user/signup`, userData);
  }

  login(userData) {
    return this.http.post(`${environment.api_base}user/login`, userData);
  }

  saveStorage(useData) {
    window.localStorage.setItem('userData', JSON.stringify(useData));
  }

  clearStorage() {
    window.localStorage.setItem('userData', '');
  }
}
