import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from './service/category.service';
import { Family } from '../../store/family';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  public family: Family;
  categories = [];
  editingCategory = false;
  categoryToEdit;
  AllCategories;
  groupIdSelected;

  constructor(private store: StoreService, private fb: FormBuilder, private caterogyService: CategoryService) { }

  ngOnInit() {
    this.store.currentFamily.subscribe( (family: Family) => {
      this.family = family;
      this.getAllCategories();
    });
    this.createCategoryForm();
  }

  getAllCategories() {
      this.AllCategories = this.family.categories;
      if (this.groupIdSelected) { this.selectGroup(this.groupIdSelected); }
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
      categoryToCreate.belongsToFamily = this.family._id;
      this.caterogyService.create(categoryToCreate).subscribe( async (res) => {
        this.categoryForm.get('name').setValue('');
        this.categoryForm.get('icono').setValue('');
        await this.store.updateFamily(this.family._id);
      });
    }
  }

  deleteCategory(category) {
    this.caterogyService.delete(category._id).subscribe( async (res) => {
      await this.store.updateFamily(this.family._id);
    });
  }

  setEditCategory(category) {
    this.categoryToEdit = category;
    this.editingCategory = true;
  }

  editCategory() {
    this.caterogyService.edit(this.categoryToEdit).subscribe( async (res) => {
      this.editingCategory = false;
      await this.store.updateFamily(this.family._id);
    });
  }

  selectGroup(groupId) {
    this.groupIdSelected = groupId;
    this.categories = this.AllCategories.filter( category => category.belongsToGroup === this.groupIdSelected);
  }

}
