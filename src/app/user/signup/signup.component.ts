import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  private userSub;

  constructor(private fb: FormBuilder, private userService: UserService) { }

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
      console.log(this.userForm.value);
      this.userSub = this.userService.signup(this.userForm.value).subscribe( response => {
        console.log('api response', response);
      });
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
