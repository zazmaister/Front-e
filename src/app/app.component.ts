import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Match } from './match';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private loading = false;
  results: Match[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.apiService.get20Matches().subscribe( data => {
      this.loading = false;
      this.results = data;
    });

  }
}
