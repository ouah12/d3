import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-remise',
  templateUrl: './chart-remise.component.html',
  styleUrls: ['./chart-remise.component.scss']
})
export class ChartRemiseComponent implements OnInit {
  @Input() name: string;
    constructor() { }

  ngOnInit() {
  }

}
