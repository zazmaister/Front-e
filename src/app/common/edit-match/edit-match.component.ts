import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Input } from '@angular/core/src/metadata/directives';
import { Match } from '../../match';
import { MatchService } from '../../match.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.scss']
})
export class EditMatchComponent implements OnInit {
  editForm: FormGroup;
  id: number;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private _location: Location, private route: ActivatedRoute) {
    // Form for editing existing match
    this.editForm = this.formBuilder.group({
      homeTeam: new FormControl(apiService.getCurrent().homeTeam, Validators.required),
      awayTeam: new FormControl(apiService.getCurrent().awayTeam, Validators.required),
      sport: new FormControl(apiService.getCurrent().sport, Validators.required),
      tournament: new FormControl(apiService.getCurrent().tournament, Validators.required),
      category: new FormControl(apiService.getCurrent().category, Validators.required),
      finalResultHome: new FormControl(apiService.getCurrent().finalResultHome, Validators.required),
      finalResultAway: new FormControl(apiService.getCurrent().finalResultAway, Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.apiService.updateMatch(this.editForm.value, this.id);
      this.back();
    }
  }

  back() {
    this._location.back();
  }

}
