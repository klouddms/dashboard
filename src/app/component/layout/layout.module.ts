import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
import '../../../../node_modules/nvd3/build/nv.d3.min';
import { nvD3 } from 'ng2-nvd3';
import { RatingModule } from "ng2-rating";

import { ROUTES } from './layout.routes';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';

import { DashboardC } from '../dashboard/dashboard.component';
import { SportsAllC } from '../sports_all/sports_all.component';
import { SportsBaseballC } from '../sports_baseball/sports_baseball.component';
import { SportsBBasketballC } from '../sports_b_basketball/sports_b_basketball.component';
import { SportsGBasketballC } from '../sports_g_basketball/sports_g_basketball.component';
import { SportsSoftballC } from '../sports_softball/sports_softball.component';
import { SportsSoccerC } from '../sports_soccer/sports_soccer.component';
import { SportsLeagueSettingsC } from '../sports_league_settings/sports_league_settings.component';
import { SportsRowDetailC } from '../sports_row_detail/sports_row_detail.component';

import { CreateLeagueFormC } from '../sports_create_league/create_league.component';

import { FeedbackAllC } from '../feedback_all/feedback_all.component';
import { FeedbackBaseballC } from '../feedback_baseball/feedback_baseball.component';
import { FeedbackBBasketballC } from '../feedback_b_basketball/feedback_b_basketball.component';
import { FeedbackGBasketballC } from '../feedback_g_basketball/feedback_g_basketball.component';
import { FeedbackSoccerC } from '../feedback_soccer/feedback_soccer.component';
import { FeedbackSoftballC } from '../feedback_softball/feedback_softball.component';
import { FeedbackSettingsC } from '../feedback_settings/feedback_settings.component';
import { FeedbackRowDetailC } from '../feedback_row_detail/feedback_row_detail.component';

import { RefereeRowDetailC } from '../referee_row_detail/referee_row_detail.component';
import { RefereeAllComponentC } from '../referee_all/referee_all.component';

import { UserService } from '../../service/user.service';
import { GameService } from '../../service/game.service';
import { EvaluationService } from '../../service/evaluation.service';
import { LeagueService } from '../../service/league.service';
import { LocationService } from '../../service/location.service';
import { RefereeService } from '../../service/referee.service';
import { GlobalVariableService } from '../../service/global.service';

import { SportsBaseMethod } from '../../service/sports.service';
import { TableBaseMethod } from '../../service/table.service';
import { FeedbackBaseMethod } from '../../service/feedback.service';

@NgModule({
  imports: [
    CommonModule,
    ROUTES,
    ButtonsModule,
    RatingModule
  ],
  declarations: [
    Layout,
    Sidebar,
    Navbar,
    nvD3,
    DashboardC,
    SportsAllC,
    SportsBaseballC,
    FeedbackAllC,
    SportsBBasketballC,
    SportsGBasketballC,
    SportsSoftballC,
    SportsLeagueSettingsC,
    SportsSoccerC,
    FeedbackBaseballC,
    FeedbackBBasketballC,
    FeedbackGBasketballC,
    FeedbackSoccerC,
    FeedbackSoftballC,
    FeedbackSettingsC,
    SportsRowDetailC,
    FeedbackRowDetailC,
    RefereeRowDetailC,
    RefereeAllComponentC,
    CreateLeagueFormC
  ],
  providers: [
    UserService,
    GameService,
    EvaluationService,
    LeagueService,
    RefereeService,
    LocationService,
    SportsBaseMethod,
    TableBaseMethod,
    FeedbackBaseMethod,
    GlobalVariableService
  ]
})
export default class LayoutModule {
}
