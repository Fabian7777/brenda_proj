import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logindata = {email:'',password:''};
  constructor(private menuctrl: MenuController, public Notify: MytoastService, public authService: AuthService, public navctrl: NavController) {
    menuctrl.enable(false);

   }

  ngOnInit() {
  }

  open_register(){
    this.navctrl.navigateForward('register');
  }

  login(){
    
    //verify
    // validate user data
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (this.logindata.email === '') {
    this.Notify.toast_with_icon_color('close-circle','Missing account email','danger')

  }else if (!re.test(this.logindata.email)){
    this.Notify.toast_with_icon_color('close-circle','Invalid user email','danger')

  } else if (this.logindata.password === '') {
    this.Notify.toast_with_icon_color('close-circle','Missing login password','danger')

  } else {

    this.loign_script();
    
  }

  }

  
  loign_script(){
  
    this.Notify.loadingPresent('checking account ...');
  
      // Api connections
      this.authService.post_without_tokens(this.logindata, 'user_login').then((data: any) => {
  
      let myresponsedata: any = data;
      console.log(myresponsedata);
  
       // close load
      this.Notify.loadingDismiss();
     
      // if a 200 response is received then login user
      if (myresponsedata.code === 200) {
        // success message
        this.Notify.toast_with_icon_color('checkmark-circle',myresponsedata.msg,'linkedin')
  
        // save device token
        localStorage.setItem('device_token', JSON.stringify(myresponsedata.jwt));
  
        this.navctrl.navigateRoot('home');
       
      }
  
      }, (err) => {
  
      // close load
      this.Notify.loadingDismiss();
      //parse error
      this.Notify.process_errors(err);
      // display error
      console.log(err);
    
      });
  }

}
