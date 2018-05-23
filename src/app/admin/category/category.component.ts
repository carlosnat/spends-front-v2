import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from './service/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  familyStore;
  categories;
  editingCategory = false;
  categoryToEdit;
  AllCategories;
  groupIdSelected;

  constructor(private store: StoreService, private fb: FormBuilder, private caterogyService: CategoryService) { }

  ngOnInit() {
    this.categories = [];
    this.familyStore = this.store.getFamily();
    this.createCategoryForm();
    this.getAllCategories();
  }

  getAllCategories() {
    this.caterogyService.getAll(this.familyStore._id).subscribe( categories => {
      this.AllCategories = categories;
      if (this.groupIdSelected) { this.selectGroup(this.groupIdSelected); }
    });
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      belongsToGroup: ['', Validators.required],
      name: ['', Validators.required],
      icono: ['', Validators.required]
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const categoryToCreate =  this.categoryForm.value;
      categoryToCreate.belongsToFamily = this.familyStore._id;
      this.caterogyService.create(categoryToCreate).subscribe( res => {
        this.categoryForm.get('name').setValue('');
        this.categoryForm.get('icono').setValue('');
        this.getAllCategories();
      });
    }
  }

  deleteCategory(category) {
    this.caterogyService.delete(category._id).subscribe( res => {
      this.getAllCategories();
    });
  }

  setEditCategory(category) {
    this.categoryToEdit = category;
    this.editingCategory = true;
  }

  editCategory() {
    this.caterogyService.edit(this.categoryToEdit).subscribe( res => {
      this.editingCategory = false;
      this.getAllCategories();
    });
  }

  selectGroup(groupId) {
    this.groupIdSelected = groupId;
    this.categories = this.AllCategories.filter( category => category.belongsToGroup === this.groupIdSelected);
  }

}
