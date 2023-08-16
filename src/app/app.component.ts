import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angulardemo1';
  opened = false;
  clicked = false;
  screen: string = '';

  public buttonClick(event: string){
    this.screen = event;
    //console.log(this.screen);
  }






}
