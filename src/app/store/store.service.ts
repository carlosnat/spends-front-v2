import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private family;

  constructor(private http: HttpClient) {}

  setFamily(family) {
    this.family = family;
  }

  getFamily() {
    return this.family;
  }

}
