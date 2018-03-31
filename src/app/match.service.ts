import { Injectable } from '@angular/core';
import { Match } from './match';

@Injectable()
export class MatchService {
  private matches: Match[];
  private currentMatch: Match; // Current editing match

  constructor() {
  }

  public setMatches(matches: Match[]): void {
    this.matches = matches;
  }

  public getMatches(): Match[] {
    return this.matches;
  }
  setCurrent(id: number) {
    const curr = this.matches.filter((match) => {
      return match.id === id;
    });
    this.currentMatch = curr[0];
  }
  getCurrent(): Match {
    return this.currentMatch;
  }

}
