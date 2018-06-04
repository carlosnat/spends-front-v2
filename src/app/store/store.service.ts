import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private familySource = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  get currentFamily() {
    const familySelected = JSON.parse(window.localStorage.getItem('familySelected'));
    this.familySource.next(familySelected);
    return this.familySource.asObservable();
  }

  setFamily(family) {
    this.updateLocalFamily(family);
  }

  async updateFamily(familyId) {
      const familyUpdated = await this.http.get(`${environment.api_base}family/${familyId}`).toPromise();
      console.log('familyUpdated', familyUpdated);
      this.updateLocalFamily(familyUpdated);
  }

  updateLocalFamily(familyUpdated) {
    window.localStorage.setItem('familySelected', JSON.stringify(familyUpdated));
    console.log('familyUpdated broadcast', familyUpdated);
    this.familySource.next(familyUpdated);
  }

}
