import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from './service/operation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  family;
  categories;
  operationForm: FormGroup;
  imagePreview;
  operationImage: File = null;
  imageDataSaved;
  uploadImageProgress;
  isUploading = false;

  constructor(
    private store: StoreService,
    private fb: FormBuilder,
    private operationService: OperationService,
    private sanitizer: DomSanitizer) { }

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

  onSelectedFile(event) {
    this.operationImage = <File>event.target.files[0];
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
  }

  uploadImage() {
    this.isUploading = true;
    const fd = new FormData();
    fd.append('image', this.operationImage, this.operationImage.name);
    this.operationService.uploadImage(fd).subscribe( event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadImageProgress = Math.round(((event.loaded / event.total) * 100));
      } else if (event.type === HttpEventType.Response) {
        this.isUploading = false;
        this.imageDataSaved = event.body;
        this.saveOperation();
      }
    });
  }

  saveOperation() {
    if (this.operationForm.valid) {
      const operation = this.operationForm.value;
      operation.family = this.family._id;
      operation.image = this.imageDataSaved;
      this.operationService.create(operation).subscribe(res => {
        this.operationForm.reset();
        this.operationImage = null;
        this.imagePreview = null;
      });
    }
  }

}
