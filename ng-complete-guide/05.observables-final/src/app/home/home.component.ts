import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscriotion: Subscription;

  constructor() { }

  ngOnInit() {
    // Custom Observables

    // this.firstObsSubscriotion = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // OR

    let counter = 0;
    const customIntervalObservable = new Observable<number>( observer => {
      setInterval(()=>{
        observer.next(counter);
        // Mimicking complete and it can be handled in subscribe method
        if(counter === 2){
          observer.complete(); // Halts the execution (increamenting count)
        }
        // Mimicking an error and it can be handled in subscribe method
        if(counter>3){
          observer.error(new Error('The count is greater than 3!!'))
        }
        counter++;
      },1000);
    })

    customIntervalObservable.pipe(map((count: number)=>{
      return `Round: ${count+1}`
    }))

    // pipe method is used to transform the data and it accepts more than one operator(comma separated)
    // map and filtre are oprators
    this.firstObsSubscriotion = customIntervalObservable.pipe(filter((count: number)=>{
      return count > 0;
    }),map((count: number)=>{
      return `Round: ${count+1}`;
    })).subscribe((cnt: String)=>{
      console.log(cnt);
    }, error => { // Error handling
      console.log(error.message);
      // alert(error.message);
    }, ()=>{ // Complete and destroy the observable (no need to unsubscribe). It won't called if there is an error
      console.log('Completed!!');
    });
  }
  ngOnDestroy(){
    this.firstObsSubscriotion.unsubscribe();
  }

}
