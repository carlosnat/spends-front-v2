import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  public userSub;
  public conecting = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  async createUser() {
    if (this.userForm.valid) {
      this.conecting = true;
      this.userSub = this.userService.signup(this.userForm.value).subscribe(
      (result) => {
        this.userForm.reset();
        this.router.navigate(['login']);
        this.conecting = true;
      },
      (error) => {
        this.conecting = false;
      });
    }
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
