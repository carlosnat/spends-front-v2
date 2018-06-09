
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMainTableComponent } from './app-main-table.component';

describe('AppMainTableComponent', () => {
  let component: AppMainTableComponent;
  let fixture: ComponentFixture<AppMainTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMainTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
