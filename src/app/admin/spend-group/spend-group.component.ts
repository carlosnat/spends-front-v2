import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupSpendService } from './service/group.service';
import { Observable } from 'rxjs';
import { Family } from '../../store/family';
@Component({
  selector: 'app-spend-group',
  templateUrl: './spend-group.component.html',
  styleUrls: ['./spend-group.component.css']
})
export class SpendGroupComponent implements OnInit {

  public family: Family;
  public groupForm: FormGroup;
  public groups;
  public editingGroup = false;
  public groupToEdit;
  public creatingGroup = false;

  constructor(private store: StoreService, private fb: FormBuilder, private groupSpendService: GroupSpendService) { }

  ngOnInit() {
    this.store.currentFamily.subscribe( (family: Family) => {
      this.family = family;
      this.groups = this.family.spendsGroups;
    });
    this.createGroupForm();
  }

  createGroupForm() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  async createGroup() {
    if (this.groupForm.valid) {
      const newGroupData = this.groupForm.value;
      newGroupData.belongsToFamily = this.family._id;
      await this.groupSpendService.create(newGroupData);
      this.groupForm.reset();
      await this.store.updateFamily(this.family._id);
      this.creatingGroup = false;
    }
  }

  setEditGroup(group) {
    this.groupToEdit = group;
    this.editingGroup = true;
  }

  editgroup() {
    this.groupSpendService.edit(this.groupToEdit).subscribe( async (res) => {
      this.editingGroup = false;
      await this.store.updateFamily(this.family._id);
    });
  }

  deleteGroup(group) {
    this.groupSpendService.delete(group._id).subscribe( async (res) => {
      await this.store.updateFamily(this.family._id);
    });
  }

}
