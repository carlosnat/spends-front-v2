import { Component, OnInit } from '@angular/core';
import { OperationService } from '../operation/service/operation.service';
import { StoreService } from '../../store/store.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opeartions;

  constructor(private store: StoreService, private opearationService: OperationService) { }

  ngOnInit() {
    this.opearationService.getAll(this.store.getFamily()._id).subscribe( res => {
      this.opeartions = res;
    });
  }

}
