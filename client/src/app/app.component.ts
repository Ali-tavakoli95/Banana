import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public userRes: User | undefined; // default
  private userResPrivate: string | undefined;

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  userFg = this.fb.group({ // formGroup
    nameCtrl: ['', [Validators.minLength(3)]], // formControl
    emailCtrl: ['', [Validators.required]],
    passwordCtrl: [],
    ageCtrl: [],
    isAdminCtrl: []
  });

  registerUser(): void {

    console.log(this.userFg.value);
  
    this.http.post<User>('http://localhost:5000/api/user/register', this.userFg.value).subscribe(
      { next: (res: User) => this.userRes = res },
    );
  }









  // constructor(private http: HttpClient, private fb: FormBuilder) { }

  // //#region Forms Group/controler
  // registerFg = this.fb.group({
  //   nameCtrl: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
  //   emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
  //   passwordCtrl: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]]
  // });
  // //#endregion

  // //#region Forms Properties
  // // Lab's Info
  // get NameCtrl(): FormControl {
  //   return this.registerFg.get('nameCtrl') as FormControl;
  // }
  // get EmailCtrl(): FormControl {
  //   return this.registerFg.get('emailCtrl') as FormControl;
  // }
  // get PasswordCtrl(): FormControl {
  //   return this.registerFg.get('passwordCtrl') as FormControl;
  // }
  // //#endregion

  // registerUser(): void {

  //   let user: User = {
  //     name: 'Reza Taba',
  //     email: 'ParSA@gmail.com',
  //     password: '109328sdf',
  //     age: 18,
  //     isAdmin: true
  //   }

  //   this.http.post("http://localhost:5000/api/user/register", user).subscribe(response => console.log(response));

  //   console.log(user);
  // }
}
