import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AppMainTableDataSource } from './app-main-table-datasource';

import { OperationService } from '../../admin/operation/service/operation.service';
import { StoreService } from '../../store/store.service';
import { Family } from '../../store/family';

@Component({
  selector: 'app-main-table',
  templateUrl: './app-main-table.component.html',
  styleUrls: ['./app-main-table.component.css']
})
export class AppMainTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AppMainTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'Fecha de registro',
    'Fecha de operación',
    'Grupo',
    'Categoría',
    'Tipo de operación',
    'Descripción',
    'Monto'
  ];

  sub;
  family;
  operations;
  other;

  constructor(private store: StoreService, private operationService: OperationService) {}

  ngOnInit() {
    this.sub = this.store.currentFamily.subscribe( (family: Family) => {
      this.family = family;
      this.operationService.getAll(this.family ._id).subscribe( res => {
        this.operations = res;
        setTimeout(() => {
          this.dataSource = new AppMainTableDataSource(this.paginator, this.sort, this.operations);
        });
      });
    });



  }
}
