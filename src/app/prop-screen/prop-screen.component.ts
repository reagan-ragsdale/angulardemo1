import { Component, OnInit } from '@angular/core';
import { SportsTitelToName } from '../sports-titel-to-name';
import { SelectedSportsData } from '../selected-sports-data';
import { GameId } from '../game-id';
import { PropData } from '../prop-data';
import { PlayerProp } from '../player-prop';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prop-screen',
  templateUrl: './prop-screen.component.html',
  styleUrls: ['./prop-screen.component.scss']
})



export class PropScreenComponent implements OnInit {

  public playerPropsClicked = false;
  arrayOfMLBTeams: SportsTitelToName = {Minnesota_Twins: "MIN", Detroit_Tigers: "DET"};
  home_team: string = '';
  away_team: string = '';



  public sportsNew: any[] = [];
  public selectedSport: string = '';
  public selectedDate: string = '';
  public selectedGame: string = '';
  public selectedGameid: string = '';

  pre_initial_player_prop = "https://api.the-odds-api.com/v4/sports/";
  middle_initial_player_prop = "/events/";
  middle_next_player_prop = "/odds/?apiKey=5ab6923d5aa0ae822b05168709bb910c&regions=us&markets=";
  post_initial_player_prop = "&bookmakers=draftkings&oddsFormat=american";



  //API strings
  pre_initial_prop = "https://api.the-odds-api.com/v4/sports/";
  post_initial_prop = "/odds/?apiKey=5ab6923d5aa0ae822b05168709bb910c&regions=us&markets=h2h,spreads&bookmakers=draftkings&oddsFormat=american";

  pre_get_games = "https://api.the-odds-api.com/v4/sports/";
  post_get_games = "/scores?apiKey=5ab6923d5aa0ae822b05168709bb910c";

  getSportsApi: string = "https://api.the-odds-api.com/v4/sports/?apiKey=5ab6923d5aa0ae822b05168709bb910c";

  displayedColumns: string[] = ['name', 'description', 'price', 'point'];

  sports: any[] = [];
  playerProps: any;
  playerPropsArray: PlayerProp[] = [{
    name: '',
    description: '',
    price: '',
    point: ''
  }];
  public dates: string[] = ["00/25/23", "00/13/14", "00/28/24"];
  public games: GameId[] = [{
    game: '',
    id: ''
  }];
  
  public displayPropHtml1: PropData =
    {
      name: '',
      h2h: '',
      spreadPoint: '',
      spreadPrice: ''
    };
  public displayPropHtml2: PropData =
    {
      name: '',
      h2h: '',
      spreadPoint: '',
      spreadPrice: ''
    };

  /* public selectedPropData: PropData[] = [{
    id: '',
    home_team: '',
    away_team: '',
    commence_time: '',
    bookmakers: [{
      key: '',
      title: '',
      markets: [{
        key: '',
        outcomes: [{
          name: '',
          price: ''
        }]

      }]

    }]
  }] */
  listOfSupportedSports: string[] = ["NBA", "NFL", "MLB", "NHL"];
  sportsToTitle: SportsTitelToName = {
    NBA: "basketball_nba",
    NFL: "americanfootball_nfl",
    MLB: "baseball_mlb"
  }
  postDateSelectedSportGames = {};
  selectedSportsDates: string[] = [];
  selectedSportGames: any;
  selectedSportsData: any;
  

  /* selectedSportsData: SelectedSportsData = {
    away_team: '',
    commence_time: '',
    completed: false,
    home_team: '',
    id: '',
    last_update: undefined,
    scores: undefined,
    sport_key: '',
    sport_title: ''
  }; */




  public trimSports(sports: any) {
    //need to figure out a way to order the sports but for now just show the main ones
    sports.forEach((sport: { title: string; }) => {
      this.listOfSupportedSports.forEach(s => {
        if (sport.title == s) {
          this.sportsNew.push(sport);
        }
      })
    });
    this.selectedSport = this.sportsNew[0].title;
  }

  setSelectedDate(date: string) {
    this.selectedDate = date;
  }
  setSelectedSport(sport: string) {
    this.selectedSport = sport;
  }
  setSelectedGame(game: string) {
    const temp = this.games.filter(x => x.game === game);
    this.selectedGame = temp[0].id;

  }



  async onSportClick(sport: any) {
    this.setSelectedSport(sport.tab.textLabel);
    //console.log(this.selectedSport)
    await this.getDatesAndGames();
  }
  onDateClick(date: any) {
    this.setSelectedDate(date.tab.textLabel);
    this.updateGames();
  }
  onGameClick(game: any) {
    this.setSelectedGame(game.tab.textLabel);
    console.log("game is")
    
    
    this.displayProp();
    if(this.selectedSport === "MLB"){
      //this.getMlbGameStats();
    }
  }






  convertSport(sport: any) {
    return this.sportsToTitle[sport];
  }
  convertDate(fullDate: string) {
    var tempDate = fullDate?.split("T");
    var indexOfFirstDash = tempDate[0].indexOf("-");
    var tempDate2 = tempDate[0].slice(indexOfFirstDash + 1, tempDate[0].length + 1);
    var finalDate = tempDate2.replace("-", "/");
    return finalDate;
  }

  
  updateDatesAndGames() {
    this.dates = [];
    this.games = [{ game: '', id: '' }];
    this.games.pop();
    this.selectedSportsData.forEach((x: { commence_time: string; }) => {
      if (!this.dates.includes(this.convertDate(x.commence_time))) {
        this.dates.push(this.convertDate(x.commence_time));
      }
    });
    this.selectedSportsData.forEach((x: { home_team: string; away_team: string; commence_time: string; id: string }) => {
      if (this.selectedDate.includes(this.convertDate(x.commence_time))) {
        this.games.push({ game: `${x.home_team} vs ${x.away_team}`, id: x.id });
        

      }
    });
    console.log(this.games)
  }
  updateGames() {
    this.games = [];
    this.selectedSportsData.forEach((x: { home_team: string; away_team: string; commence_time: string; id: string }) => {
      if (this.selectedDate.includes(this.convertDate(x.commence_time))) {
        this.games.push({ game: `${x.home_team} vs ${x.away_team}`, id: x.id });
      }
    });
    console.log(this.games)
  }

  displayProp() {


    const tempProp = this.selectedSportsData.filter((x: { id: string; }) => x.id == this.selectedGame);
    const tempNew = tempProp[0];
    //this.displayPropHtml.pop();

    var name1 = '';
    var h2h = '';
    var spreadPoint = '';
    var spreadPrice = '';

    name1 = tempNew.bookmakers[0].markets[0].outcomes[0].name;
    h2h = tempNew.bookmakers[0].markets[0].outcomes[0].price;
    spreadPoint = tempNew.bookmakers[0].markets[1].outcomes[0].point;
    spreadPrice = tempNew.bookmakers[0].markets[1].outcomes[0].price;
    this.displayPropHtml1 = ({ name: name1, h2h: h2h, spreadPoint: spreadPoint, spreadPrice: spreadPrice });
    name1 = tempNew.bookmakers[0].markets[0].outcomes[1].name;
    h2h = tempNew.bookmakers[0].markets[0].outcomes[1].price;
    spreadPoint = tempNew.bookmakers[0].markets[1].outcomes[1].point;
    spreadPrice = tempNew.bookmakers[0].markets[1].outcomes[1].price;
    this.displayPropHtml2 = ({ name: name1, h2h: h2h, spreadPoint: spreadPoint, spreadPrice: spreadPrice });
    //console.log(this.displayPropHtml)
  }





  //API calls

  public async getSports() {
    const promise = await fetch(this.getSportsApi);
    const processedResponse = await promise.json();
    this.selectedSportGames = processedResponse;
    return processedResponse;
  }

  public async getDatesAndGames() {
    const sportNew = this.convertSport(this.selectedSport);
    //const apiCall = this.pre_get_games + sportNew + this.post_get_games;
    const apiCall = this.pre_initial_prop + sportNew + this.post_initial_prop;
    const promise = await fetch(apiCall);
    const processedResponse = await promise.json();
    this.selectedSportsData = processedResponse;
    console.log("below is data")
    console.log(this.selectedSportsData)
    this.updateDatesAndGames();
  }

  async loadPlayerProps(){
    if(this.playerPropsClicked == true){
      this.playerPropsClicked = false;
      return;
    }
    this.playerPropsClicked = true;
    var urlNew  = '';
    if(this.selectedSport === "MLB"){
      //replace batterhomeruns with stringcontaining all mlb player props
      urlNew = this.pre_initial_player_prop + this.convertSport(this.selectedSport) + this.middle_initial_player_prop + this.selectedGame + this.middle_next_player_prop + "batter_home_runs" + this.post_initial_player_prop;
    }

    const promise = await fetch(urlNew);
    const processedResponse = await promise.json();
    this.playerProps = processedResponse;
    console.log(this.playerProps)
    this.addplayerPropToArray();
  }

  addplayerPropToArray(){
    this.playerPropsArray = [];
    //this.playerProps = [];
    console.log(this.playerProps.bookmakers[0].markets[0].outcomes[0].name)
    for(var i = 0; i < this.playerProps.bookmakers[0].markets[0].outcomes.length; i++){
      this.playerPropsArray.push({ 
        name: this.playerProps.bookmakers[0].markets[0].outcomes[i].name, 
        description: this.playerProps.bookmakers[0].markets[0].outcomes[i].description, 
        price: this.playerProps.bookmakers[0].markets[0].outcomes[i].price, 
        point: this.playerProps.bookmakers[0].markets[0].outcomes[i].point});
    }
    this.playerProps = new MatTableDataSource(this.playerPropsArray);
  }





  async ngOnInit() {
    this.trimSports(await this.getSports());
    //await this.getDatesAndGames();

  }

}
