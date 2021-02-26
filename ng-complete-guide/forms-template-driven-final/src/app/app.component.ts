import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  user = {
    username: '',
    email: '',
    secret: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // Not recommended because setValue overrides the whole form
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'Male'
    // });

    // Recommended because patchValue overrides parts of the form
    // Note: "setValue" is also available on form
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
      questionAnswer: 'Test',
      gender: 'Male'
    });
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  // Using @ViewChild()
  onSubmit(){
    // console.log(this.signupForm.value);
    // console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
