import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from './service/family-service';
import { UserService } from '../../user/service/user-service';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  familyForm: FormGroup;
  public families;
  public editingFamily = false;
  public familyToEdit;

  constructor(
    private fb: FormBuilder,
    private familyService: FamilyService,
     private userService:  UserService,
    private store: StoreService
  ) { }

  ngOnInit() {
    this.createFamilyForm();
    this.getAllFamilies();
  }

  createFamilyForm() {
    this.familyForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createFamily() {
    if (this.familyForm.valid) {
      const familyData = this.familyForm.value;
      familyData.userId = this.userService.getUserId();
      this.familyService.create(familyData)
      .subscribe( res => {
        this.familyForm.reset();
        this.getAllFamilies();
      }, err => {
        console.error(err);
      });
    }
  }

  getAllFamilies() {
    this.familyService.getAll(this.userService.getUserId()).subscribe( (res: any) => {
      this.families = res;
    });
  }

  deleteFamily(family) {
    this.familyService.delete(family._id).subscribe( res => {
      this.getAllFamilies();
    });
  }

  setEditFamily(family) {
    this.familyToEdit = family;
    this.editingFamily = true;
  }

  editFamily() {
    this.familyService.edit(this.familyToEdit).subscribe( res => {
      this.editingFamily = false;
      this.getAllFamilies();
    });
  }

  selectFamily(family) {
    this.store.setFamily(family);
  }

}
