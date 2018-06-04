import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupSpendService {

  endpoint = 'spendgroup';

  constructor(private http: HttpClient) {}

  getAll(familyId) {
    return this.http.get(`${environment.api_base}${this.endpoint}`, { params: { familyId: familyId } });
  }

  create(GroupSpendData) {
    return this.http.post(`${environment.api_base}${this.endpoint}`, GroupSpendData).toPromise();
  }

  delete(idGroupSpend) {
    return this.http.delete(`${environment.api_base}${this.endpoint}`, { params: { _id: idGroupSpend }});
  }

  edit(GroupSpendData) {
    return this.http.put(`${environment.api_base}${this.endpoint}`, GroupSpendData);
  }

}
