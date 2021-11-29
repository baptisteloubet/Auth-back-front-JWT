import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  errors = null;
  hide = true;


  constructor(
    public fb: FormBuilder,
    route: ActivatedRoute,
    public authService: AuthService,
  ) {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: ['']
    })
    route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls['passwordToken'].setValue(params['token']);
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.authService.resetPassword(this.changePasswordForm.value).subscribe(
      result => {
        alert('Le mot de passe a été changé');
        this.changePasswordForm.reset();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error:any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }

}
