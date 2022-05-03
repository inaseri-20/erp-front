import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  login(): void {
    this.loading = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      response => {
        this.alertService.messageSuccess(response.msg);
        this.loading = false;
        this.router.navigate(['/auth/verify/' + this.loginForm.value.username]);
      }, error => {
        this.alertService.messageError(error);
        this.loading = false;
      }
    );
  }
}
