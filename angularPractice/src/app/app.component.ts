import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  username = '';
  showDetails = true;
  logger = [];
  onDisplayDetails(){
  	this.showDetails = !this.showDetails;
  	this.logger.push(new Date());
  }
}
