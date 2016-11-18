import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { nvD3 } from 'ng2-nvd3';
import { UserService } from '../../service/user.service';
import { GameService } from '../../service/game.service';
import { EvaluationService } from '../../service/evaluation.service';
import { RefereeService } from '../../service/referee.service';
import { TableBaseMethod } from '../../service/table.service';
import { GlobalVariableService } from '../../service/global.service';
import * as _ from 'lodash';

declare let d3: any;
declare let $: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.css']
})
export class DashboardC implements OnInit, AfterViewInit {
  @ViewChild(nvD3)
  public nvD3: nvD3;

  public optionsVal = {};
  public dataVal = [];

  public feedbackTableDataVal = [];
  public recentTableDataVal = [];
  public upcomingTableDataVal = [];
  public topRefereeTableDataVal = [];
  public pieChartDataVal = [];

  constructor(private router: Router, private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private tableMethodIns:TableBaseMethod, private globalIns: GlobalVariableService) {
    this.feedbackTableDataVal = this.getFeedbackDataMed(userServiceIns.getUserJsonDataMed(), gameServiceIns.getGameJsonDataMed(), evaluationServiceIns.getEvaluationJsonDataMed());
    this.recentTableDataVal = this.getRecentDataMed(gameServiceIns.getGameJsonDataMed(), refereeServiceIns.getRefereeJsonDataMed());
    this.upcomingTableDataVal = this.getUpcompingDataMed(gameServiceIns.getGameJsonDataMed(), refereeServiceIns.getRefereeJsonDataMed());
    this.topRefereeTableDataVal = this.getTopDataMed(refereeServiceIns.getRefereeJsonDataMed());
    this.pieChartDataVal = this.getPieChartDataMed(evaluationServiceIns.getEvaluationJsonDataMed());
  }

  ngOnInit() {
    this.optionsVal = {
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
    this.dataVal = this.pieChartDataVal;
  }

  ngAfterViewInit() {
    this.tableMethodIns.drawDataTableMed('#dashborad-datatable-table');
    this.tableMethodIns.drawTableOnlyPagination('#dashborad-referee-table')
    this.tableMethodIns.drawTableOnlyPagination('#dashborad-recent-table')
    this.tableMethodIns.drawTableOnlyPagination('#dashborad-upcoming-table')
  }

  getFeedbackDataMed(userInfoParam, gameInfoParam, evaluationInfoParam) {
    let dataTemp = [];
    evaluationInfoParam.forEach((evalIter) => {
      let gameTemp = _.find(gameInfoParam, (o) => { return o.id == evalIter.gameId; }),
        userTemp = _.find(userInfoParam, (o) => { return o.id == evalIter.userId; });

      dataTemp.push({
        game: gameTemp.name,
        commenter: `${userTemp.firstName} ${userTemp.lastName}`,
        feedback: evalIter.feedback,
        contact: evalIter.contact
      })
    });
    return dataTemp;
  }

  getRecentDataMed(gameInfoParam, refereeInfoParam) {
    let dataTemp = [],
        filterUpcomingDataTemp = _.filter(gameInfoParam, (o) => {return o.status == "completed"});

        _.forEach(filterUpcomingDataTemp, (gameIter) => {
          dataTemp.push({
            game: gameIter.name,
            ref1: (_.find(refereeInfoParam, (o) => { return o.id == gameIter.refs[0]})).rating,
            ref2: (_.find(refereeInfoParam, (o) => { return o.id == gameIter.refs[1]})).rating,
            ref3: 'Yes'
          })
        })
    return dataTemp;
  }

  getUpcompingDataMed(gameInfoParam, refereeInfoParam) {
    let dataTemp = [],
        filterUpcomingDataTemp = _.filter(gameInfoParam, (o) => {return o.status == "scheduled"});

        _.forEach(filterUpcomingDataTemp, (gameIter) => {
          dataTemp.push({
            game: gameIter.name,
            ref1: (_.find(refereeInfoParam, (o) => { return o.id == gameIter.refs[0]})).rating,
            ref2: (_.find(refereeInfoParam, (o) => { return o.id == gameIter.refs[1]})).rating,
            ref3: 'Yes'
          })
        })
    return dataTemp;
  }

  getTopDataMed(refereeInfoParam){
    let dataTemp = [];

    _.forEach(refereeInfoParam, (referIter) => {
      dataTemp.push({
        referee: `${referIter.firstName} ${referIter.lastName}`,
        score: referIter.rating
      })
    })
    // dataTemp = Array(3).fill(rowTemp);
    return dataTemp;
  }

  getPieChartDataMed(evaluationInfoParam){
    let dataTemp = _.countBy(evaluationInfoParam, (o) => { return o.sentiment});
    return  _.map(dataTemp, (value, prop) => {
      return { key: prop, y: value };
    });
  }
}
