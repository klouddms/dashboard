import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { nvD3 } from 'ng2-nvd3';
import { UserService } from '../../service/user.service';
import { GameService } from '../../service/game.service';
import { EvaluationService } from '../../service/evaluation.service';
import { RefereeService } from '../../service/referee.service';
import { LeagueService } from '../../service/league.service';
import { LocationService } from '../../service/location.service';
import { SportsBaseMethod } from '../../service/sports.service';
import { TableBaseMethod } from '../../service/table.service';
import { GlobalVariableService } from '../../service/global.service';

import * as _ from 'lodash';

declare let d3: any;

@Component({
  selector: 'sports_b_basketball',
  templateUrl: '../sports_baseball/sports_baseball.template.html',
})

export class SportsBBasketballC implements OnInit, AfterViewInit {
  options;
  data;
  @ViewChild(nvD3)
  nvD3: nvD3;

  public subMenuNameVal = ['Baseball', 'Softball', 'B Basketball', 'G Basketball'];
  public tabNameAndIdVal = [];
  public tabDataVal = [];

  constructor(private router: Router, private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private leagueServiceIns: LeagueService, private locationServiceIns: LocationService, private sportsServiceIns: SportsBaseMethod , private tableMethodIns:TableBaseMethod, private globalIns: GlobalVariableService) {
    this.tabNameAndIdVal = this.sportsServiceIns.getTabDataBySubMenuMed(this.leagueServiceIns.getLeagueJsonDataMed(), 'Basketball', 'M');
    _.forEach(this.tabNameAndIdVal, (n) => {
      let recentTableDataValByTab = this.sportsServiceIns.getRecentTableDataByTabMed(n, this.gameServiceIns.getGameJsonDataMed(), this.refereeServiceIns.getRefereeJsonDataMed(), 'male');
      let upcomingTableDataValByTab = this.sportsServiceIns.getUpcomingTableDataByTabMed(n, this.gameServiceIns.getGameJsonDataMed(), this.locationServiceIns.getLocationJsonDataMed(), 'male');
      let feedbackDataValByTab = this.sportsServiceIns.getFeedbackDataMed(n, this.evaluationServiceIns.getEvaluationJsonDataMed(), 'male');
      let pieChartDataValByTab = this.sportsServiceIns.getPieChartDataMed(n, this.evaluationServiceIns.getEvaluationJsonDataMed(), 'male');

      this.tabDataVal.push({
        recent: recentTableDataValByTab,
        upcoming: upcomingTableDataValByTab,
        feedback: feedbackDataValByTab,
        pie: pieChartDataValByTab,
        id: n.id,
        name: n.name
      })
    })
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
  }

  beforeClickTabMed(event){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10)
  }

  ngAfterViewInit() {
    _.forEach(this.tabNameAndIdVal, (n) => {
      this.tableMethodIns.drawDataTableMed('#b-basketball-sports-upcoming-table'+n.id);
      this.tableMethodIns.drawDataTableMed('#b-basketball-sports-recent-table'+n.id);
    })
  }
  getTableIdMed(uORParam:boolean, tabContentParam: any){
    if(tabContentParam != null || tabContentParam != undefined){
      if(uORParam){
        return `b-basketball-sports-recent-table${tabContentParam.id}`;
      }else{
        return `b-basketball-sports-upcoming-table${tabContentParam.id}`;
      }
    }
  }

  gotoRowDetailMed(row){
    this.globalIns.setGameIdMed(row.gameId);
    this.globalIns.setPreviousRouteMed('app/sports_b_basketball');
    this.router.navigate(['app/sports_detail'])
  }
}
