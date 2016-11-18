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
import { FeedbackBaseMethod } from '../../service/feedback.service';
import { GlobalVariableService } from '../../service/global.service';

import * as _ from 'lodash';

declare let d3: any;

@Component({
  selector: 'feedback_row_detail',
  templateUrl: './feedback_row_detail.template.html',
})

export class FeedbackRowDetailC implements OnInit {
  options;
  data;
  @ViewChild(nvD3)
  nvD3: nvD3;

  public starsCountVal: number = 0;
  public evaluationIdVal: string = '';
  public evaluationDataVal: any = {};
  public userTableDataVal: any = {};
  public gameTableDataVal: any = [];
  public refereeTableDataVal: any = {};
  public feedbackDataVal: string = '';
  public sentimentPictureVal: string = '';
  public rating: number = 0;


  constructor(private router: Router, private userServiceIns: UserService, private gameServiceIns: GameService, private evaluationServiceIns: EvaluationService, private refereeServiceIns: RefereeService, private leagueServiceIns: LeagueService, private locationServiceIns: LocationService, private sportsServiceIns: SportsBaseMethod, private tableMethodIns: TableBaseMethod, private globalIns: GlobalVariableService, private feedbackServiceIns: FeedbackBaseMethod) {
    this.starsCountVal = 2;
    this.evaluationIdVal = this.globalIns.getEvaluationIdMed();
    this.evaluationDataVal = this.feedbackServiceIns.getRowForEvaluationDataMed(this.evaluationServiceIns.getEvaluationJsonDataMed(), this.evaluationIdVal);
    this.userTableDataVal = this.feedbackServiceIns.getRowForUserTableDataMed(this.userServiceIns.getUserJsonDataMed(), this.evaluationDataVal);
    this.gameTableDataVal = this.feedbackServiceIns.getRowForGameTableDataMed(this.gameServiceIns.getGameJsonDataMed(), this.evaluationDataVal);
    this.refereeTableDataVal = this.feedbackServiceIns.getRowForRefereeTableDataMed(this.refereeServiceIns.getRefereeJsonDataMed(), this.evaluationDataVal);
    this.feedbackDataVal = this.evaluationDataVal.feedback;
    this.sentimentPictureVal = this.evaluationDataVal.sentiment;
    this.rating = this.evaluationDataVal.rating;
  }

  ngOnInit() {
  }

  gotoBackPageMed(){
    this.router.navigate([this.globalIns.getPreviousRouteMed()]);
  }
}
