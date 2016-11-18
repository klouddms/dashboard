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
  selector: 'sports_soccer',
  templateUrl: '../sports_baseball/sports_baseball.template.html',
})

export class SportsSoccerC implements OnInit , AfterViewInit {
  options;
  data;
  @ViewChild(nvD3)
  nvD3: nvD3;

  public subMenuNameVal = ['Baseball', 'Softball', 'B Basketball', 'G Basketball'];
  public tabNameAndIdVal = [];
  public tabDataVal = [];

  constructor(private router: Router, private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private leagueServiceIns: LeagueService, private locationServiceIns: LocationService, private sportsServiceIns: SportsBaseMethod , private tableMethodIns:TableBaseMethod, private globalIns: GlobalVariableService) {
    this.tabNameAndIdVal = this.sportsServiceIns.getTabDataBySubMenuMed(this.leagueServiceIns.getLeagueJsonDataMed(), 'Soccer', null);
    _.forEach(this.tabNameAndIdVal, (n) => {
      let recentTableDataValByTab = this.sportsServiceIns.getRecentTableDataByTabMed(n, this.gameServiceIns.getGameJsonDataMed(), this.refereeServiceIns.getRefereeJsonDataMed(), null);
      let upcomingTableDataValByTab = this.sportsServiceIns.getUpcomingTableDataByTabMed(n, this.gameServiceIns.getGameJsonDataMed(), this.locationServiceIns.getLocationJsonDataMed(), null);
      let feedbackDataValByTab = this.sportsServiceIns.getFeedbackDataMed(n, this.evaluationServiceIns.getEvaluationJsonDataMed(), null);
      let pieChartDataValByTab = this.sportsServiceIns.getPieChartDataMed(n, this.evaluationServiceIns.getEvaluationJsonDataMed(), null);

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

  ngAfterViewInit() {
    _.forEach(this.tabNameAndIdVal, (n) => {
      this.tableMethodIns.drawDataTableMed('#softball-sports-upcoming-table'+n.id);
      this.tableMethodIns.drawDataTableMed('#softball-sports-recent-table'+n.id);
    })
  }

  beforeClickTabMed(event){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10)
  }

  getTableIdMed(uORParam:boolean, tabContentParam: any){
    if(tabContentParam != null || tabContentParam != undefined){
      if(uORParam){
        return `softball-sports-recent-table${tabContentParam.id}`;
      }else{
        return `softball-sports-upcoming-table${tabContentParam.id}`;
      }
    }
  }

  gotoRowDetailMed(row){
    this.globalIns.setGameIdMed(row.gameId);
    this.globalIns.setPreviousRouteMed('app/sports_soccer');
    this.router.navigate(['app/sports_detail'])
  }
}
