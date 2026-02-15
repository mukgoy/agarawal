import { Component, NgZone } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationService } from 'src/app/services/validation.service';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isShowPhoneLogin: boolean = false;
  formFields = [
    { name: 'phone', label: 'Phone', type: 'text', required: true, space: 1, validators: [Validators.required, ValidationService.phoneValidator] },
  ];
  phoneLoginForm: FormGroup = new FormGroup({});

  constructor(
    private zone: NgZone,
    public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initGoogleLogin();
    this.checkIsShowPhoneLogin();
  }

  initGoogleLogin() {
    this.oneTapPopup();
    this.renderGoogleButton();
  }
  oneTapPopup(){
    google.accounts.id.initialize({
      client_id: '26042621815-5q4gpnoeoeqmt3mq858b664oenj42p9d.apps.googleusercontent.com',
      callback: (response: any) => {
        this.zone.run(() => {
          this.handleCredentialResponse(response);
        });
      }
    });
    google.accounts.id.prompt();

  }
  renderGoogleButton() {
    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large"
      }
    );
  }

  handleCredentialResponse(response: any) {
    console.log('JWT Token:', response.credential);
    this.authService.googleLogin(response.credential).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        if (!response.user.phone) {
          this.isShowPhoneLogin = true;
        }else{
          this.redirectAfterLogin();
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  updatePhone() {
    if (this.phoneLoginForm.valid) {
      const phone = this.phoneLoginForm.get('phone')?.value;
      this.authService.updatePhone(phone).subscribe({
        next: (response: any) => {
          console.log('Phone updated successfully:', response);
          this.redirectAfterLogin();
        },
        error: (error) => {
          console.error('Failed to update phone:', error);
        }
      });
    }
  }

  checkIsShowPhoneLogin(){
    if(this.authService.getAuth().token){
      if(this.authService.getAuth().user?.phone){
        this.isShowPhoneLogin = false;
      }else{
        this.isShowPhoneLogin = true;
      }
    }
  }

  redirectAfterLogin() {
    // Implement your redirection logic here, e.g., navigate to the dashboard
    let redirectUrl = localStorage.getItem('afterlogin-redirect-url');
    localStorage.removeItem('afterlogin-redirect-url');
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      this.router.navigate(['/']);
    }
  }
}
