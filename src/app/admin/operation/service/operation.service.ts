import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  endpoint = 'operation';

  constructor(private http: HttpClient) {}

  getAll(familyId) {
    return this.http.get(`${environment.api_base}${this.endpoint}/family/${familyId}`);
  }

  create(operationData) {
    return this.http.post(`${environment.api_base}${this.endpoint}`, operationData);
  }

  delete(categoryId) {
    return this.http.delete(`${environment.api_base}${this.endpoint}`, { params: { _id: categoryId }});
  }

  edit(operationData) {
    return this.http.put(`${environment.api_base}${this.endpoint}`, operationData);
  }

  uploadImage(operationImage) {
    return this.http.post(`${environment.api_base}${this.endpoint}/upload`, operationImage, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
