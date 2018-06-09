import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from './service/operation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { Family } from '../../store/family';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  public family: Family;
  categories;
  operationForm: FormGroup;
  imagePreview;
  operationImage: File = null;
  imageDataSaved;
  uploadImageProgress;
  isUploading = false;
  isSaving = false;

  constructor(
    private store: StoreService,
    private fb: FormBuilder,
    private operationService: OperationService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.store.currentFamily.subscribe( (family: Family) => {
      this.family = family;
    });
    this.createOperationForm();
  }

  createOperationForm() {
    this.operationForm = this.fb.group({
      group: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.minLength(1), Validators.min(1)]],
      description: [''],
      occurrenceDate: [''],
      type : ['', Validators.required]
    });
  }

  setGroupSelected(groupId) {
    this.categories = this.family.categories.filter( (category: any) => category.belongsToGroup === groupId);
  }

  onSelectedFile(event) {
    this.operationImage = <File>event.target.files[0];
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
  }

  uploadImage() {
    this.isUploading = true;
    this.isSaving = true;
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
      this.operationService.create(operation).subscribe( async (res) => {
        this.operationForm.reset();
        this.operationImage = null;
        this.imagePreview = null;
        await this.store.updateFamily(this.family._id);
        this.isSaving = false;
      });
    }
  }

}
