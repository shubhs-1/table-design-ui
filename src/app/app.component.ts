import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
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

export class AppComponent {
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

    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }
}
