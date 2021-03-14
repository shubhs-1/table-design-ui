import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css', 
  '../../node_modules/@swimlane/ngx-datatable/index.css',
  '../../node_modules/@swimlane/ngx-datatable/assets/icons.css',
  '../../node_modules/@swimlane/ngx-datatable/themes/material.scss']
})

export class AppComponent{
  title = 'table-design-ui';
  state: any;
  rows = [];
  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `./assets/data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (item) {
        return (item.id.toString().toLowerCase().indexOf(val) !== -1 || item.name.toLowerCase().indexOf(val) !== -1 || 
        item.age.toString().toLowerCase().indexOf(val) !== -1 || item.gender.toLowerCase().indexOf(val) !== -1 || 
        item.city.toLowerCase().indexOf(val) !== -1 || item.pincode.toString().toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;
  }
}
