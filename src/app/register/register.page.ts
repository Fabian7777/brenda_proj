import { MytoastService } from 'src/app/services/mytoast.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userdata = {firstname:'',lastname:'',email:'',contact:'',client_id:'',password:''};
  repeat_password = '';

  constructor(private menuctrl: MenuController, public Notify: MytoastService, public alertCtrl: AlertController, public authService: AuthService, public navctrl: NavController) { 
    menuctrl.enable(false);
  }

  ngOnInit() {
  }

  register(){
    
    //set default data
    this.userdata.client_id = this.authService.client_id;

    //verify
    // validate user data
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (this.userdata.firstname === '') {
    this.Notify.toast_with_icon_color('close-circle','Missing firstname','danger')

  }else if (this.userdata.lastname ==""){
    this.Notify.toast_with_icon_color('close-circle','Missing lastname','danger')

  }else if (this.userdata.email == ""){
    this.Notify.toast_with_icon_color('close-circle','Missing user email address','danger')

  }else if (!re.test(this.userdata.email)){
    this.Notify.toast_with_icon_color('close-circle','Invalid user email','danger')

  } else if (this.userdata.contact === '') {
    this.Notify.toast_with_icon_color('close-circle','Missing user contact','danger')

  } else if (this.userdata.contact.toString().length !== 9) {
    this.Notify.toast_with_icon_color('close-circle','Invalid contact','danger')

  } else if (this.userdata.password === '') {
    this.Notify.toast_with_icon_color('close-circle','Missing login password','danger')

  } else if (this.userdata.password !== this.repeat_password) {
    this.Notify.toast_with_icon_color('close-circle','Passwords dont match. Check your password and try again','danger')

  } else {

    this.register_confirm();
    
  }

  }

  async register_confirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Account creation',
      message: 'Are you sure '+this.userdata.firstname+' you want to create your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Create',
          handler: () => {
            console.log('Confirm Okay');
            this.register_script();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  register_script(){
  
    this.Notify.loadingPresent('Creating account ...');
  
      // Api connections
      this.authService.post_without_tokens(this.userdata, 'user_register').then((data: any) => {
  
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
