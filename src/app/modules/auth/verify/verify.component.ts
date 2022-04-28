import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alert/alert.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  verifyCodeForm!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private autService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.verifyCodeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      username: [this.activatedRoute.snapshot.params['tell']]
    });
  }

  verify(): void {
    this.loading = true;
    this.autService.verify(this.verifyCodeForm.value).subscribe(
      response => {
        this.loading = false;
        localStorage.setItem('erpAccessToken', response.access);
        localStorage.setItem('erpRefreshToken', response.refresh);
        this.alertService.messageSuccess(response.msg);
      }, error => this.alertService.messageError(error)
    );
  }

  getCode(): void {
    this.loading = true;
    this.autService.loginUser(this.verifyCodeForm.value).subscribe(
      response => {
        this.loading = false;
        this.alertService.messageSuccess(response.msg);
      }, error => this.alertService.messageError(error)
    );
  }
}
