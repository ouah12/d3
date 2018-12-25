import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-pie-protocol',
  templateUrl: './chart-pie-protocol.component.html',
  styleUrls: ['./chart-pie-protocol.component.scss']
})
export class ChartPieProtocolComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
