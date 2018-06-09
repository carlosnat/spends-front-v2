import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  private loginSub;
  public errorMessage;
  public isRequesting = false;


  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group(
      {
        email: ['', Validators.required ],
        password: ['', Validators.required ]
      }
    );
  }

  login() {
    this.isRequesting = true;
    if (this.userForm.valid) {
      this.loginSub = this.userService.login(this.userForm.value).subscribe(
        res => {
          this.userService.saveStorage(res);
          this.isRequesting = false;
          this.router.navigate(['admin/stats']);
        },
        err => {
          this.showMessage(err);
        }
      );
    }
  }

  signup() {
    this.router.navigate(['signup']);
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  showMessage(err) {
    this.errorMessage = err;
  }

}
