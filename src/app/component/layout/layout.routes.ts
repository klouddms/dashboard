import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { DashboardC } from '../dashboard/dashboard.component';
import { SportsAllC } from '../sports_all/sports_all.component';
import { SportsBaseballC } from '../sports_baseball/sports_baseball.component';
import { SportsBBasketballC } from '../sports_b_basketball/sports_b_basketball.component';
import { SportsGBasketballC } from '../sports_g_basketball/sports_g_basketball.component';
import { SportsSoftballC } from '../sports_softball/sports_softball.component';
import { SportsLeagueSettingsC } from '../sports_league_settings/sports_league_settings.component';
import { SportsSoccerC } from '../sports_soccer/sports_soccer.component';
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

const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'dashboard', component: DashboardC },
    // { path: 'another', loadChildren: () => System.import('../another/another.module') },
    // sports accordion
    { path: 'sports_all', component: SportsAllC },
    { path: 'sports_baseball', component: SportsBaseballC },
    { path: 'sports_b_basketball', component: SportsBBasketballC },
    { path: 'sports_g_basketball', component: SportsGBasketballC },
    { path: 'sports_league_settings', component: SportsLeagueSettingsC },
    { path: 'sports_softball', component: SportsSoftballC },
    { path: 'sports_soccer', component: SportsSoccerC },
    { path: 'sports_detail', component: SportsRowDetailC },
    { path: 'create_league', component: CreateLeagueFormC },
    // feedback accordion
    { path: 'feedback_all', component: FeedbackAllC },
    { path: 'feedback_b_basketball', component: FeedbackBBasketballC },
    { path: 'feedback_g_basketball', component: FeedbackGBasketballC },
    { path: 'feedback_soccer', component: FeedbackSoccerC },
    { path: 'feedback_softball', component: FeedbackSoftballC },
    { path: 'feedback_baseball', component: FeedbackBaseballC },
    { path: 'feedback_detail', component: FeedbackRowDetailC },
    { path: 'feedback_settings', component: FeedbackSettingsC },
    // referee accordion
    { path: 'referee_detail', component: RefereeRowDetailC },
    { path: 'referee_all', component: RefereeAllComponentC }
  ]}
];


export const ROUTES = RouterModule.forChild(routes);
