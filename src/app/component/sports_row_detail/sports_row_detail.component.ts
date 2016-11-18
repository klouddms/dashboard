import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'sports_row_detail',
  templateUrl: './sports_row_detail.template.html',
})

export class SportsRowDetailC implements OnInit, AfterViewInit {
  optionsVal;
  data;

  private gameIdVal: string;

  public gameDetailVal: string = '';
  public homeTeamVal: string = '';
  public awayTeamVal: string = '';
  public pieChartVal: string = '';
  public firstTableDataVal: any[] = [];
  public secondTableDataVal: any[] = [];

  constructor(private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private leagueServiceIns: LeagueService, private locationServiceIns: LocationService, private sportsServiceIns: SportsBaseMethod , private tableMethodIns:TableBaseMethod, private globalIns: GlobalVariableService, private router: Router) {
      this.gameIdVal = this.globalIns.getGameIdMed();
      [this.gameDetailVal, this.homeTeamVal, this.awayTeamVal] = this.sportsServiceIns.getRowForGameDetailMed(this.gameServiceIns.getGameJsonDataMed() , this.gameIdVal);
      this.pieChartVal = this.sportsServiceIns.getRowForPieChartMed(this.evaluationServiceIns.getEvaluationJsonDataMed(), this.gameIdVal);
      this.firstTableDataVal = this.sportsServiceIns.getRowForFirstTableMed(this.gameServiceIns.getGameJsonDataMed(), this.refereeServiceIns.getRefereeJsonDataMed(), this.gameIdVal);
      this.secondTableDataVal = this.sportsServiceIns.getRowForSecondTableMed(this.evaluationServiceIns.getEvaluationJsonDataMed(), this.userServiceIns.getUserJsonDataMed(), this.gameIdVal);
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
  }

  ngAfterViewInit(){
    this.tableMethodIns.drawDataTableMed('#row-detail-table');
  }

  gotoBackPageMed(){
    this.router.navigate([this.globalIns.getPreviousRouteMed()]);
  }
}
