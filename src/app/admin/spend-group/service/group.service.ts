import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupSpendService {

  constructor(private http: HttpClient) {}

  getAll(familyId) {
    return this.http.get(`${environment.api_base}spendgroup`, { params: { familyId: familyId } });
  }

  create(GroupSpendData) {
    return this.http.post(`${environment.api_base}spendgroup`, GroupSpendData);
  }

  delete(idGroupSpend) {
    return this.http.delete(`${environment.api_base}spendgroup`, { params: { _id: idGroupSpend }});
  }

  edit(GroupSpendData) {
    return this.http.put(`${environment.api_base}spendgroup`, GroupSpendData);
  }

}
