import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElasticSearchService } from './elasticSearch/elastic-search.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { IData } from './data.interface';
import { POPULATION } from './shared/population';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('firstNameInput') nameInputRef: ElementRef;
  form: FormGroup;
  private htmlElement: HTMLElement;
  titleProtocol = 'protocoles';
  titleRemise = 'remises';

    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private radius: number;

    private arc: any;
    private labelArc: any;
    private pie: any;
    private color: any;
    private svg: any;
    private x: any;
    private y: any;
    private g: any;

  constructor(private fb: FormBuilder, private es: ElasticSearchService) {
    this.createForm();
    this.width = 400 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  createForm() {
    this.form = this.fb.group({
      dateTo: ['', Validators.required ],
      dateFrom: ['', Validators.required ]
    }, {validator: this.dateLessThan('dateFrom', 'dateTo')});
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const dateFrom = group.controls[from];
      const dateTo = group.controls[to];
      if (dateFrom.value > dateTo.value) {
        return {
          dates: 'Erreur de dates'
        };
      }
      return {};
    };
  }

  getPieChagrt() {
        console.log(`${this.form.value.dateFrom} et ${this.form.value.dateTo}`);
  }


  ngOnInit() {
    this.initSvgPie();
    this.drawPie();
    this.initSvgBars();
    this.initAxisBars();
    this.drawAxisBars();
    this.drawBars();
}

private initSvgPie() {
    this.color = d3Scale.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius - 40)
        .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.population);
    this.svg = d3.select('#protocolId')
        .append('g')
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
}

private drawPie() {
    const g = this.svg.selectAll('.arc')
        .data(this.pie(POPULATION))
        .enter().append('g')
        .attr('class', 'arc')
        .on('click', (d) => this.getProduits(d.data.age));
    g.append('path').attr('d', this.arc)
        .style('fill', (d: any) => this.color(d.data.age) );
    g.append('text').attr('tranform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
        .attr('dy', '.35em')
        .text((d: any) => d.data.age);
}

private initSvgBars() {
  this.svg = d3.select('#remiseId');
  this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
  this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
  this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

private initAxisBars() {
  this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
  this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
  this.x.domain(POPULATION.map((d) => d.age));
  this.y.domain([0, d3Array.max(POPULATION, (d) => d.population)]);
}

private drawAxisBars() {
  this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
  this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(10, '%'))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('population');
}

private drawBars() {
  this.g.selectAll('.bar')
      .data(POPULATION)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.age) )
      .attr('y', (d) => this.y(d.population) )
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.population) );
}

  private getProduits(data: any) {
    alert(data);
  }
}
