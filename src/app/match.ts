
export class Match {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  sport: string;
  category: string;
  tournament: string;
  finalResultHome: number;
  finalResultAway: number;
  periods: number[][];

  constructor(matchInfo: Match) {
    this.date = matchInfo.date;
    this.time = matchInfo.time;
    this.homeTeam = matchInfo.homeTeam;
    this.awayTeam = matchInfo.awayTeam;
    this.sport = matchInfo.sport;
    this.category = matchInfo.category;
    this.tournament = matchInfo.tournament;
    this.finalResultHome = matchInfo.finalResultHome;
    this.finalResultAway = matchInfo.finalResultAway;
    this.periods = matchInfo.periods;
  }
}
