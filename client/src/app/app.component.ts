import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './models/user.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public userRes: User | undefined; // default
  // private userResPrivate: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  //#region Form Group/controler
  userFg = this.fb.group({ // formGroup
    nameCtrl: ['', [Validators.minLength(3), Validators.maxLength(30)]], // formControl
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: [],
    ageCtrl: [],
    isAdminCtrl: []
  });
  //#endregion

  //#region Methods
  registerUser(): void {

    console.log(this.userFg.value);

    let user: User = {
      name: this.NameCtrl.value,
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value,
      age: this.AgeCtrl.value,
      isAdmin: this.IsAdminCtrl.value
    }

    this.http.post<User>('http://localhost:5000/api/user/register', user).subscribe(
      { next: (res: User) => this.userRes = res },
    );
  }
  //#endregion



  //#region Forms Properties
  // Lab's Info
  get NameCtrl(): FormControl {
    return this.userFg.get('nameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }  
  get AgeCtrl(): FormControl {
    return this.userFg.get('ageCtrl') as FormControl;
  }  
  get IsAdminCtrl(): FormControl {
    return this.userFg.get('isAdminCtrl') as FormControl;
  }
  //#endregion

  abstractOutput(){
    console.log(this.userFg);
  }
}
