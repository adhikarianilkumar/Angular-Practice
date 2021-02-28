import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.serveice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLogginBtn: boolean = true;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServer(id: number){
    // Complex calculation for Routing
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment:'Loading'});
  }

  onLogin(){
    this.authService.login();
    this.showLogginBtn = false;
  }

  onLogout(){
    this.authService.logout();
    this.showLogginBtn = true;
  }

}
