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

  constructor(private store: StoreService, private fb: FormBuilder, private caterogyService: CategoryService) { }

  ngOnInit() {
    this.familyStore = this.store.getFamily();
    this.getAllCategories();
    this.createCategoryForm();
  }

  getAllCategories() {
    this.caterogyService.getAll(this.familyStore._id).subscribe( categories => {
      this.categories = categories;
    });
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      belongsToGroup: [this.familyStore.spendsGroups[0]._id, Validators.required],
      name: ['', Validators.required],
      icono: ['', Validators.required]
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const categoryToCreate =  this.categoryForm.value;
      categoryToCreate.belongsToFamily = this.familyStore._id;
      this.caterogyService.create(categoryToCreate).subscribe( res => {
        console.log('res', res);
        this.categoryForm.reset();
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
    console.log('save changes');
    this.caterogyService.edit(this.categoryToEdit).subscribe( res => {
      console.log('res', res);
      this.editingCategory = false;
      this.getAllCategories();
    });
  }

}
