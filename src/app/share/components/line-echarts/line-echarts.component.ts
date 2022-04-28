import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-line-echarts',
  templateUrl: './line-echarts.component.html',
  styleUrls: ['./line-echarts.component.css']
})
export class LineEChartsComponent implements OnInit, OnChanges {

  @Input() series: any;
  @Input() data: any;
  @Input() labelKey: any;
  @Input() height: any;

  chart: EChartsOption = {};


  constructor() {
  }

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.createChartLabels(this.data, this.series);
    }
  }

  initChart(xData: any, series: any): void {
    this.chart = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
  }

  createChartLabels(baseData: any[], series: any): void {
    const xData = [];
    for (const key of baseData) {
      xData.push(key[this.labelKey]);
    }
    this.initChart(xData, series);
  }

  randomColor(transparentPercentage: string): string {
    const trans = transparentPercentage;
    let color = 'rgba(';
    for (let i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 255) + ',';
    }
    color += trans + ')';
    return color;
  }
}
