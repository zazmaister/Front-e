import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './common/common.module';
import { EditMatchComponent } from './common/edit-match/edit-match.component';
import { MatchesComponent } from './common/matches/matches.component';

const appRoutes: Routes = [
  { path: 'matches/edit/:id', component: EditMatchComponent },
  {
    path: 'matches',
    component: MatchesComponent
  },
  { path: '',
    redirectTo: '/matches',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    ),
    SharedModule

  ],
  providers: [ ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
