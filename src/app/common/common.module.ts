import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchesComponent } from './matches/matches.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    EditMatchComponent,
    MatchesComponent
  ],
  exports: [
    CommonModule,
    EditMatchComponent,
    MatchesComponent,
    RouterModule

  ]
})
export class SharedModule { }
