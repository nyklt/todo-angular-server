import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, TokenResponse} from "../../../../shared/api/auth-service/auth.service";
import {NotificationsService} from "../../../../shared/common-services/notifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  fadeIn = false;
  viewMode = 'SignIn';

  signInObj = {
    username: new FormControl('', [Validators.required, Validators.nullValidator]),
    password: new FormControl('', [Validators.required, Validators.nullValidator])
  };

  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signUpForm = this.initSignUpForm()
  }

  initSignUpForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.maxLength(30)],
      lastName: ['', Validators.maxLength(30)],  // not necessary new FormControl() because is already!
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
      ])],
      age: ['', Validators.compose([
        Validators.maxLength(30),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(40),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])]
    })
  }

  signIn() {
    this.authService.signIn({username: this.signInObj.username.value, password: this.signInObj.password.value})
      .subscribe((tokenResponse: TokenResponse) => {
        this.authService.setLocalUserInfo(tokenResponse);
        this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : '/products']);
        this.notificationsService.success('Logged in.');
      }, () => {
        this.notificationsService.error('Sign in fail');
      });
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value)
      .subscribe((tokenResponse: TokenResponse) => {
        this.fadeIn = !this.fadeIn;

        // set SignIn form with signUp values
        this.signInObj.username.setValue(this.signUpForm.get('username').value);
        this.signInObj.password.setValue(this.signUpForm.get('password').value);

        this.notificationsService.success('Registration completed successfully. You can sign in now.');
        this.initSignUpForm();
      }, () => {
        this.notificationsService.error('Registration could not be done.');
      })
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'You must type a value !' :
      formControl.hasError('nullValidator') ? 'Invalid value!' :
        '';
  }
}
