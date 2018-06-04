import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  endpoint = 'family';

  constructor(private http: HttpClient) {}

  getAll(userId) {
    return this.http.get(`${environment.api_base}${this.endpoint}/user/${userId}`);
  }

  create(familyData) {
    return this.http.post(`${environment.api_base}${this.endpoint}`, familyData);
  }

  delete(idFamily) {
    return this.http.delete(`${environment.api_base}${this.endpoint}`, { params: { _id: idFamily }});
  }

  edit(familyData) {
    return this.http.put(`${environment.api_base}${this.endpoint}`, familyData);
  }

}
