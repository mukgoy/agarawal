import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent {

  @Input() dataArr: any[] = []
  @Input() dataMap: any = {};
  @ContentChild('actionsItems') actionsItems!: TemplateRef<any>;
  @ContentChild('expandedView') expandedView!: TemplateRef<any>;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.dataArr);
  displayedColumns: string[] = [];
  columnsToDisplayWithExpand:string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  constructor() { }

  ngOnChanges() {
    const mappedData = this.dataMapping(this.dataArr);
    this.dataSource = new MatTableDataSource(mappedData);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;

    this.displayedColumns = Object.keys(this.dataMap);
    if(!!this.actionsItems){
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'actionsItems'];
    }else{
      this.columnsToDisplayWithExpand = [...this.displayedColumns];
    }
  }

  getValueFromObject(obj: any, key: string): any {
    return key.split('.').reduce((o, k) => (o || {})[k], obj);
  }

  dataMapping(data: any[]) {
    return data.map(element => {
      Object.keys(this.dataMap).forEach((key) => {
          element[key] = this.getValueFromObject(element, this.dataMap[key]);
      }, {} as any);
      element.isExpanded =false;
      return element;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
