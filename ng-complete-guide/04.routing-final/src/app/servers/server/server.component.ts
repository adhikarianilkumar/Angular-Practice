import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // This is very helpful when using asynchronous data
    this.route.data.subscribe((data: Data) => {
      this.server = data['server']; // The key value of the data should match key of resolve object in AppRouter
    });

    // since Resolver is used below code is commented
    // this.server = this.serversService.getServer(
    //   +this.route.snapshot.queryParams['id']
    // );
    // this.route.params.subscribe((params: Params)=>{
    //   this.server = this.serversService.getServer(+params['id']);
    // });
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
