import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group(
      {
        user: ['', Validators.required ],
        pass: ['', Validators.required ]
      }
    );
  }

  login() {
    if (this.userForm.valid) {
      this.router.navigate(['admin/stats']);
    }
  }

  signup() {
    this.router.navigate(['signup']);
  }

}
