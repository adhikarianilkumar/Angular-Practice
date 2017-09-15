import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() intervalTriggered = new EventEmitter<number>();
  interval;
  lastNumberEmitted = 0;

  constructor() { }

  ngOnInit() {
  }

  startGame() {
    this.interval = setInterval(() => {
      this.intervalTriggered.emit(this.lastNumberEmitted + 1);
      this.lastNumberEmitted++;
    }, 1000);
  }
  pauseGame() {
    clearInterval(this.interval);
  }

}
