import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedsub: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedsub = this.userService.activatedEmmiter.subscribe((isActivated)=>{
      this.userActivated = isActivated;
    });
  }

  ngOnDestroy(){
    this.activatedsub.unsubscribe();
  }
}
