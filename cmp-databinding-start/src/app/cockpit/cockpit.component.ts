import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output('srvCreated') serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('newServerContentInput') serverContentInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddServer(srvName: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: srvName.value,
      serverContent: this.serverContentInput.nativeElement.value // NOT prefferd
    });
  }

  onAddBlueprint(bpName: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: bpName.value,
      serverContent: this.serverContentInput.nativeElement.value // NOT prefferd
    });
  }

}
