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
import { FeedbackBaseMethod } from '../../service/feedback.service';

import * as _ from 'lodash';

declare let d3: any;

@Component({
  selector: 'referee_all',
  templateUrl: './referee_all.template.html',
})

export class RefereeAllComponentC implements OnInit, AfterViewInit {
  options;
  data;
  @ViewChild(nvD3)
  nvD3: nvD3;

  public countRefsVal: number = 0;
  public countEvalsVal: number = 0;
  public countGamesVal: number = 0;
  public allTabDataVal: any = [];
  public baseBallTabDataVal: any = [];
  public bBasketTabDataVal: any = [];
  public gBasketTabDataVal: any = [];
  public softBallTabDataVal: any = [];
  public soccerTabDataVal: any = [];
  public tabDataVal: any = [];
  public chartDataVal: any = [];

  constructor(private router: Router, private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private leagueServiceIns: LeagueService, private locationServiceIns: LocationService, private sportsServiceIns: SportsBaseMethod, private tableMethodIns: TableBaseMethod, private globalIns: GlobalVariableService, private feedbackServiceIns: FeedbackBaseMethod) {
    this.countRefsVal = (this.refereeServiceIns.getRefereeJsonDataMed()).length;
    this.countEvalsVal = this.refereeServiceIns.getCountEvaluationMed(this.evaluationServiceIns.getEvaluationJsonDataMed());
    this.countGamesVal = this.refereeServiceIns.getCountGamesMed(this.gameServiceIns.getGameJsonDataMed());
    this.allTabDataVal = this.refereeServiceIns.getTabDatabyTabName('all', null, this.gameServiceIns.getGameJsonDataMed());
    this.baseBallTabDataVal = this.refereeServiceIns.getTabDatabyTabName('Baseball', null, this.gameServiceIns.getGameJsonDataMed());
    this.bBasketTabDataVal = this.refereeServiceIns.getTabDatabyTabName('Basketball', 'B', this.gameServiceIns.getGameJsonDataMed());
    this.gBasketTabDataVal = this.refereeServiceIns.getTabDatabyTabName('Basketball', 'G', this.gameServiceIns.getGameJsonDataMed());
    this.softBallTabDataVal = this.refereeServiceIns.getTabDatabyTabName('Soccer', null, this.gameServiceIns.getGameJsonDataMed());
    this.soccerTabDataVal = this.refereeServiceIns.getTabDatabyTabName('Softball', null, this.gameServiceIns.getGameJsonDataMed());
    this.chartDataVal = this.feedbackServiceIns.getPieChartDataMed(this.evaluationServiceIns.getEvaluationJsonDataMed(),'all', null, null);
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
    this.tableMethodIns.drawDataTableMed('#referee-datatable-table');
    this.tableMethodIns.drawTableOnlyPagination('#referee-top-table')
  }

  getTabData(num) {
    switch (num) {
      case 1:
        this.tabDataVal = this.allTabDataVal;
        break;
      case 2:
        this.tabDataVal = this.baseBallTabDataVal;
        break;
      case 3:
        this.tabDataVal = this.bBasketTabDataVal;
        break;
      case 4:
        this.tabDataVal = this.gBasketTabDataVal;
        break;
      case 5:
        this.tabDataVal = this.soccerTabDataVal;
        break;
      case 6:
        this.tabDataVal = this.softBallTabDataVal;
        break;
    }
  }

}
