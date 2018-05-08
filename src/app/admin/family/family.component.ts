import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FamilyService } from './service/family-service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  familyForm: FormGroup;

  constructor(private fb: FormBuilder, private familyService: FamilyService) { }

  ngOnInit() {
    this.createFamilyForm();
  }

  createFamilyForm() {
    this.familyForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createFamily() {
    if (this.familyForm.valid) {
      this.familyService.create(this.familyForm.value)
      .subscribe( res => {
        this.familyForm.reset();
      }, err => {
        console.error(err);
      });
    }
  }

}
