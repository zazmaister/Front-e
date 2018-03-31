import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Match } from '../../match';
import { MatchService } from '../../match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  loading = false;
  private calledFirst = false;
  results: Match[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    if (this.apiService.getMatches() === undefined) {
      console.log('AAAAAAA');
      this.getData();
    } else {
      this.loading = true;
      this.results = this.apiService.getMatches();
      console.log('AAAAAAAB');
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

  setCurrent(id: number) {
    this.apiService.setCurrent(id);
  }

}
