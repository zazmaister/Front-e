import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Match } from './match';

@Injectable()
export class ApiService {

  private _getURL = './assets/mockFile.json';
  private matches: Match[];
  private currentMatch: Match;

  constructor(private http: Http) {
  }

  get20Matches(): Observable<Match[]> {
    return this.http.get(this._getURL)
      .map((response: Response) => {
        const data  =  response.json().doc[0].data;
        let count = 0, array = [];
        /* I know thats the most ugly piece of code, unfortunately i couldnt
        find better solution. THIS IS TEMPORARY SOLUTION!!!!*/
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].realcategories.length; j++) {
            for (let k = 0; k < data[i].realcategories[j].tournaments.length; k++) {
              for (let l = 0; l < data[i].realcategories[j].tournaments[k].matches.length; l++) {
                if (count < 20 && data[i].realcategories[j].tournaments[k].matches[l].status._id === 100) {
                  array = [
                    ...array,
                    new Match({
                      id: data[i].realcategories[j].tournaments[k].matches[l]._id,
                      date: data[i].realcategories[j].tournaments[k].matches[l]._dt.date,
                      time: data[i].realcategories[j].tournaments[k].matches[l]._dt.time,
                      homeTeam: data[i].realcategories[j].tournaments[k].matches[l].teams.home.name,
                      awayTeam: data[i].realcategories[j].tournaments[k].matches[l].teams.away.name,
                      sport: data[i].name,
                      category: data[i].realcategories[j].name,
                      tournament: data[i].realcategories[j].tournaments[k].name,
                      finalResultHome: data[i].realcategories[j].tournaments[k].matches[l].result.home,
                      finalResultAway: data[i].realcategories[j].tournaments[k].matches[l].result.away,
                      periods: this.getPeriods(data[i].realcategories[j].tournaments[k].matches[l].periods)
                    })];
                  count++;
                } else {
                  break;
                }

                if (count === 20) {
                  this.matches = array;
                  return array;
                }
              }
            }
          }
        }
        this.matches = array;
        return array;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  private getPeriods(periods: any): number[][] {
    const resultByPeriods = [];
    let sumHomePeriods = 0;
    let sumAwayPeriods = 0;
    Object.keys(periods).forEach((key, index) => {
      if ( key === 'ft' ) {
        resultByPeriods[index] = [periods.ft.home - sumHomePeriods, periods.ft.away - sumAwayPeriods];
      } else {
        sumHomePeriods += periods[key].home;
        sumAwayPeriods += periods[key].away;
        resultByPeriods[index] = [periods[key].home, periods[key].away];
      }
    });
    return resultByPeriods;
  }

  public setMatches(matches: Match[]): void {
    this.matches = matches;
  }

  public getMatches(): Match[] {
    return this.matches;
  }

  public getMatch(id: number): Match {
    const curr = this.matches.filter((match) => {
      return match.id === id;
    });
    return curr[0];
  }

  public updateMatch(match: Match, id: number) {
    this.currentMatch = match;
    const index = this.matches.findIndex(m => m.id === id);

    this.matches[index] = Object.assign({}, this.matches[index], match);
  }

}
