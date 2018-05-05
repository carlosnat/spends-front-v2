import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendGroupComponent } from './spend-group.component';

describe('SpendGroupComponent', () => {
  let component: SpendGroupComponent;
  let fixture: ComponentFixture<SpendGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
