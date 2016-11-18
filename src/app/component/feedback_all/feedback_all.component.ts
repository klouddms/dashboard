import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { nvD3 } from 'ng2-nvd3'
declare let d3: any;
import * as _ from 'lodash';
import * as moment from 'moment'
declare var jQuery: any;

import { UserService } from '../../service/user.service';
import { GameService } from '../../service/game.service';
import { EvaluationService } from '../../service/evaluation.service';
import { RefereeService } from '../../service/referee.service';
import { TableBaseMethod } from '../../service/table.service';
import { FeedbackBaseMethod } from '../../service/feedback.service';
import { GlobalVariableService } from '../../service/global.service';

@Component({
  selector: 'feedback_all',
  templateUrl: './feedback_all.template.html',
})

export class FeedbackAllC implements OnInit, AfterViewInit{

  @ViewChild(nvD3)
  nvD3: nvD3;

  @ViewChild('allPieChart') allPieChart: nvD3;
  @ViewChild('positivePieChart') positivePieChart: nvD3;

  options;
  options1;
  public allDataVal = [];
  public positiveDataVal = [];
  public negativeDataVal = [];
  public neutralDataVal = [];

  //All Tab
  public allRecentTableDataVal = [];
  public allUpcomingTableDataVal = [];
  public allPieChartTableDataVal = [];
  //Positive Tab
  public positiveRecentTableDataVal = [];
  public positiveUpcomingTableDataVal = [];
  public positivePieChartTableDataVal = [];
  //negative Tab
  public negativeRecentTableDataVal = [];
  public negativeUpcomingTableDataVal = [];
  public negativePieChartTableDataVal = [];
  //Neutral Tab
  public neutralRecentTableDataVal = [];
  public neutralUpcomingTableDataVal = [];
  public neutralPieChartTableDataVal = [];

  constructor(private router: Router, private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private tableMethodIns:TableBaseMethod, private feedbackMethodIns: FeedbackBaseMethod, private globalIns: GlobalVariableService) {

    this.allRecentTableDataVal = this.feedbackMethodIns.getRecentDataMed(userServiceIns.getUserJsonDataMed(), gameServiceIns.getGameJsonDataMed(), evaluationServiceIns.getEvaluationJsonDataMed(), 'all', null, null);
    this.allUpcomingTableDataVal = this.feedbackMethodIns.getUpcompingDataMed(gameServiceIns.getGameJsonDataMed(), 'all', null, null);
    this.allPieChartTableDataVal = this.feedbackMethodIns.getPieChartDataMed(evaluationServiceIns.getEvaluationJsonDataMed(), 'all', null, null);

    this.positiveRecentTableDataVal = this.feedbackMethodIns.getRecentDataMed(userServiceIns.getUserJsonDataMed(), gameServiceIns.getGameJsonDataMed(), evaluationServiceIns.getEvaluationJsonDataMed(), 'positive', null, null);
    this.positiveUpcomingTableDataVal = this.feedbackMethodIns.getUpcompingDataMed(gameServiceIns.getGameJsonDataMed(), 'positive', null, null);
    this.positivePieChartTableDataVal = this.feedbackMethodIns.getPieChartDataMed(evaluationServiceIns.getEvaluationJsonDataMed(), 'positive', null, null);

    this.negativeRecentTableDataVal = this.feedbackMethodIns.getRecentDataMed(userServiceIns.getUserJsonDataMed(), gameServiceIns.getGameJsonDataMed(), evaluationServiceIns.getEvaluationJsonDataMed(), 'negative', null, null);
    this.negativeUpcomingTableDataVal = this.feedbackMethodIns.getUpcompingDataMed(gameServiceIns.getGameJsonDataMed(), 'negative', null, null);
    this.negativePieChartTableDataVal = this.feedbackMethodIns.getPieChartDataMed(evaluationServiceIns.getEvaluationJsonDataMed(), 'negative', null, null);

    this.neutralRecentTableDataVal = this.feedbackMethodIns.getRecentDataMed(userServiceIns.getUserJsonDataMed(), gameServiceIns.getGameJsonDataMed(), evaluationServiceIns.getEvaluationJsonDataMed(), 'neutral', null, null);
    this.neutralUpcomingTableDataVal = this.feedbackMethodIns.getUpcompingDataMed(gameServiceIns.getGameJsonDataMed(), 'neutral', null, null);
    this.neutralPieChartTableDataVal = this.feedbackMethodIns.getPieChartDataMed(evaluationServiceIns.getEvaluationJsonDataMed(), 'neutral', null, null);
  }


  ngOnInit() {
    this.options = {
      chart: {
        type: 'pieChart',
        height: 300,
        x: function(d) { return d.key; },
        y: function(d) { return d.y; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: false,
        showLegend: false
      }
    }
    this.options1 = {
      chart: {
        type: 'pieChart',
        height: 299,
        x: function(d) { return d.key; },
        y: function(d) { return d.y; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: false,
        showLegend: false
      }
    };

    this.allDataVal = this.allPieChartTableDataVal;
    this.positiveDataVal = this.positivePieChartTableDataVal;
    this.negativeDataVal = this.negativePieChartTableDataVal;
    this.neutralDataVal = this.neutralPieChartTableDataVal;
  }

  ngAfterViewInit() {
    console.log(this.positivePieChart);
    this.allPieChart.chart.update();
    this.positivePieChart.chart.update();

    this.tableMethodIns.drawDataTableMed('#all-feedback-recent-table');
    this.tableMethodIns.drawDataTableMed('#positive-feedback-recent-table');
    this.tableMethodIns.drawDataTableMed('#neutral-feedback-recent-table');
    this.tableMethodIns.drawDataTableMed('#negative-feedback-recent-table');

    this.tableMethodIns.drawTableOnlyPagination('#all-feedback-upcoming-table')
    this.tableMethodIns.drawTableOnlyPagination('#positive-feedback-upcoming-table')
    this.tableMethodIns.drawTableOnlyPagination('#negative-feedback-upcoming-table')
    this.tableMethodIns.drawTableOnlyPagination('#neutral-feedback-upcoming-table')
  }

  beforeClickTabMed(event){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10)
  }

  gotoDetailMed(row: any){
    this.globalIns.setEvaluationIdMed(row.id);
    this.globalIns.setPreviousRouteMed('app/feedback_all');
    this.router.navigate(['app/feedback_detail'])
  }
}
