import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationService } from '../operation/service/operation.service';
import { StoreService } from '../../store/store.service';
import { Family } from '../../store/family';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  opeartions;
  sub: any;
  public family: Family;

  constructor(private store: StoreService, private opearationService: OperationService) { }

  async ngOnInit() {
    this.sub = this.store.currentFamily.subscribe( (family: Family) => {
      this.family = family;
      this.opearationService.getAll(this.family ._id).subscribe( res => {
        this.opeartions = res;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
