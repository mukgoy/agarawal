import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '26042621815-5q4gpnoeoeqmt3mq858b664oenj42p9d.apps.googleusercontent.com',
      callback: (response: any) => {
        this.zone.run(() => {
          this.handleCredentialResponse(response);
        });
      }
    });

    // One Tap popup
    google.accounts.id.prompt();
    this.renderButton();
  }

  handleCredentialResponse(response: any) {
    console.log('JWT Token:', response.credential);

    // 👉 Backend को भेजो
    // this.authService.loginWithGoogle(response.credential);
  }

  renderButton(){
    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large"
      }
    );    
  }

}
