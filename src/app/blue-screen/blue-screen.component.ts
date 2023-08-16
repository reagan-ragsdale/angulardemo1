import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-blue-screen',
  templateUrl: './blue-screen.component.html',
  styleUrls: ['./blue-screen.component.scss']
})



export class BlueScreenComponent {

  @Output() newItemEvent = new EventEmitter<string>();

  blueClick() {
    this.newItemEvent.emit('Red Screen');
  }


}
