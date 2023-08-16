import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-red-screen',
  templateUrl: './red-screen.component.html',
  styleUrls: ['./red-screen.component.scss']
})
export class RedScreenComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  redClick() {
    this.newItemEvent.emit('Blue Screen');
  }
}
