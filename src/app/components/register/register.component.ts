import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  repeatPass: string = 'none';

  displayMsg: string = '';
  isAccountCreated: boolean = false;
  constructor(private authservice: AuthService) {}

  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    gender: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    rpwd: new FormControl(''),
  });

  registerSubmit() {
    if (this.Pwd.value == this.RPwd.value) {
      console.log(this.registerForm.valid);
      this.repeatPass = 'none';
      this.authservice
        .registerUser([
          this.registerForm.value.firstname,
          this.registerForm.value.lastname,
          this.registerForm.value.email,
          this.registerForm.value.mobile,
          this.registerForm.value.gender,
          this.registerForm.value.pwd,
        ])
        .subscribe((res) => {
          if (res == 'Success') {
            this.displayMsg = 'Account Created Successfully';
            this.isAccountCreated = true;
          } else if (res = 'Already Exist') {
            this.displayMsg = 'Account Already Exist. Try another mail';
            this.isAccountCreated = false;
          } else {
            this.displayMsg = 'Something Wrong please try again';
            this.isAccountCreated = false;
          }
        });
    } else {
      this.repeatPass = 'inline';
    }
    
    
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get Pwd(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPwd(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }
}
