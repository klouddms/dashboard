import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { nvD3 } from 'ng2-nvd3'
import * as _ from 'lodash';
import * as moment from 'moment'

import { UserService } from '../../service/user.service';
import { GameService } from '../../service/game.service';
import { EvaluationService } from '../../service/evaluation.service';
import { RefereeService } from '../../service/referee.service';
import { TableBaseMethod } from '../../service/table.service';
import { GlobalVariableService } from '../../service/global.service';

declare let d3: any;

@Component({
  selector: 'sports_all',
  templateUrl: './sports_all.template.html',
})

export class SportsAllC implements OnInit, AfterViewInit {
  @ViewChild('allPieChart')
  nvD3: nvD3;

  public optionsVal: any = {};
  public dataVal: any[] = [];
  public recentTableDataVal: any[] = [];
  public upcomingTableDataVal: any[] = [];
  public pieChartDataVal: any[] = [];

  constructor(private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private tableMethodIns:TableBaseMethod, private router: Router, private globalIns: GlobalVariableService) {
    this.recentTableDataVal = this.getRecentDataMed(userServiceIns.getUserJsonDataMed(), gameServiceIns.getGameJsonDataMed(), evaluationServiceIns.getEvaluationJsonDataMed());
    this.upcomingTableDataVal = this.getUpcompingDataMed(gameServiceIns.getGameJsonDataMed());
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
    this.tableMethodIns.drawDataTableMed('#all-sports-recent-table');
    this.tableMethodIns.drawTableOnlyPagination('#all-sports-upcoming-table')
  }

  getRecentDataMed(userInfoParam, gameInfoParam, evaluationInfoParam) {
    let dataTemp = [];
    evaluationInfoParam.forEach((evalIter) => {

      let gameTemp = _.find(gameInfoParam, (o) => { return o.id == evalIter.gameId; }),
        userTemp = _.find(userInfoParam, (o) => { return o.id == evalIter.userId; });

      if (gameTemp.status != 'completed') return;

      dataTemp.push({
        gameId: gameTemp.id,
        game: gameTemp.name,
        sport: gameTemp.sport,
        date: moment(gameTemp.creationTimeStamp).subtract(10, 'days').calendar(),
        commenter: `${userTemp.firstName} ${userTemp.lastName}`,
        feedback: evalIter.feedback,
        sentiment: evalIter.sentiment,
        contact: evalIter.contact,
        respond: userTemp.email
      })
    });
    return dataTemp;
  }

  getUpcompingDataMed(gameInfoParam) {
    let dataTemp = [],
      filterUpcomingDataTemp = _.filter(gameInfoParam, (o) => { return o.status == "scheduled" });

    _.forEach(filterUpcomingDataTemp, (gameIter) => {
      dataTemp.push({
        gameId: gameIter.id,
        game: gameIter.name,
        sport: gameIter.sport,
        date: moment(gameIter.creationTimeStamp).subtract(10, 'days').calendar(),
      })
    })
    return dataTemp;
  }

  getPieChartDataMed(evaluationInfoParam) {
    let dataTemp = _.countBy(evaluationInfoParam, (o) => { return o.sentiment });
    return _.map(dataTemp, (value, prop) => {
      return { key: prop, y: value };
    });
  }

   gotoDetailMed(row: any){
     this.globalIns.setGameIdMed(row.gameId);
     this.globalIns.setPreviousRouteMed('app/sports_all');
     this.router.navigate(['app/sports_detail'])
   }
}
