import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient) {}

  create(familyData) {
    return this.http.post(`${environment.api_base}family`, familyData);
  }

}
