import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Match } from '../../match';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  loading = false;
  results: Match[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    if (this.apiService.getMatches() === undefined) {
      this.getData();
    } else {
      this.loading = true;
      this.results = this.apiService.getMatches();
    }
  }

  getData() {
    if (!this.results) {
      this.apiService.get20Matches().subscribe( data => {
        this.loading = true;
        this.results = data;
        this.apiService.setMatches(this.results);
      });
    }
  }
}
