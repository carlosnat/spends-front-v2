import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupSpendService } from './service/group.service';

@Component({
  selector: 'app-spend-group',
  templateUrl: './spend-group.component.html',
  styleUrls: ['./spend-group.component.css']
})
export class SpendGroupComponent implements OnInit {

  public family;
  public groupForm: FormGroup;
  public groups;

  constructor(private store: StoreService, private fb: FormBuilder, private groupSpendService: GroupSpendService) { }

  ngOnInit() {
    this.family = this.store.getFamily();
    this.createGroupForm();
    this.getAllGroups();
  }

  createGroupForm() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  createGroup() {
    if (this.groupForm.valid) {
      const newGroupData = this.groupForm.value;
      newGroupData.belongsToFamily = this.family._id;
      this.groupSpendService.create(newGroupData)
      .subscribe( res => {
        console.log('res', res);
        this.groupForm.reset();
        this.getAllGroups();
      }, err => {
        console.error(err);
      });
    }
    console.log();
  }

  getAllGroups() {
    this.groupSpendService.getAll(this.family._id).subscribe( groups => {
      console.log('groups', groups);
      this.groups = groups;
    });
  }



}
