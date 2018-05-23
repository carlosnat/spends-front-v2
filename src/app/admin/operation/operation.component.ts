import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from './service/operation.service';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  family;
  categories;
  operationForm: FormGroup;

  constructor(private store: StoreService, private fb: FormBuilder, private operationService: OperationService) { }

  ngOnInit() {
    this.family = this.store.getFamily();
    this.createOperationForm();
  }

  createOperationForm() {
    this.operationForm = this.fb.group({
      group: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
      description: [''],
      occurrenceDate: [''],
      type : ['']
    });
  }

  setGroupSelected(groupId) {
    this.categories = this.family.categories.filter( category => category.belongsToGroup === groupId);
  }

  saveOperation() {
    if (this.operationForm.valid) {
      const operation = this.operationForm.value;
      operation.family = this.family._id;
      this.operationService.create(operation).subscribe(res => {
        this.operationForm.reset();
      });
    }
  }

}
