import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient) {}

  getAll(userId) {
    return this.http.get(`${environment.api_base}family`, { params: { userId: userId } });
  }

  create(familyData) {
    return this.http.post(`${environment.api_base}family`, familyData);
  }

  delete(idFamily) {
    return this.http.delete(`${environment.api_base}family`, { params: { _id: idFamily }});
  }

  edit(familyData) {
    return this.http.put(`${environment.api_base}family`, familyData);
  }

}
