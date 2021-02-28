import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, ShadowDom
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log(`First --> constructor called only once when component instantiates`);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`Second -->ngOnChanges called after a bound input property changes`);
    console.log(changes);
  }

  ngOnInit() {
    console.log(`Third --> ngOnInit called once the component is initialized`);
    console.log(`Text Content in ngOnInit: ` + this.header.nativeElement.textContent);
    console.log(`Text Content of paragraph in ngOnInit: ` + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log(`Fourth --> ngDoCheck called during every change detection run`);
  }

  ngAfterContentInit() {
    console.log(`Fifth --> ngAfterContentInit called after content (ng-content) has been projected into view`);
    console.log(`Text Content of paragraph in ngAfterContentInit: ` + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log(`Sixth --> ngAfterContentChecked called every time the projected content has beeen checked`);
  }

  ngAfterViewInit() {
    console.log(`Seventh --> ngAfterViewInit called after the component's view (and child views) has been initialized`);
    console.log(`Text Content in ngAfterViewInit: `  + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log(`Eight --> ngAfterViewChecked called everytime the view (and child views) have been checked`);
  }

  ngOnDestroy() {
    console.log(`Ninth --> ngOnDestroy called once the component is about to be destroyed`);
  }

}
