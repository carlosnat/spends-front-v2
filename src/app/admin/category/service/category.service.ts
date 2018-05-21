import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  endpoint = 'category';

  constructor(private http: HttpClient) {}

  getAll(familyId) {
    return this.http.get(`${environment.api_base}${this.endpoint}`, { params: { familyId: familyId } });
  }

  create(categoryData) {
    return this.http.post(`${environment.api_base}${this.endpoint}`, categoryData);
  }

  delete(categoryId) {
    return this.http.delete(`${environment.api_base}${this.endpoint}`, { params: { _id: categoryId }});
  }

  edit(categoryData) {
    return this.http.put(`${environment.api_base}${this.endpoint}`, categoryData);
  }

}
