import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Test', 'User'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        //'username': new FormControl(null, Validators.required), // Single validator
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), // Multiple validators
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   value => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      value => console.log(value)
    );

    this.signupForm.setValue({
      'userData': {
        'username': 'LeoSet',
        'email': 'testSet@mail.com',
      },
      'gender': 'Female',
      'hobbies': []
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'LeoPatch',
        'email': 'testPatch@mail.com',
      },
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl):{[s: string]: boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(() => {
        if(control.value === 'anilkumar.adhikari01@gmail.com'){
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
