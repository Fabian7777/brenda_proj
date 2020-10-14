import { Component, OnInit } from '@angular/core';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bodacleaning',
  templateUrl: './bodacleaning.page.html',
  styleUrls: ['./bodacleaning.page.scss'],
})
export class BodacleaningPage implements OnInit {
  boda_data = {license:'',pay_contact:'',ttl:'',service:'Boda cleaning'};
  userdata: any;

  constructor( public Notify: MytoastService, public authService: AuthService, public alertCtrl: AlertController) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
   this.load_account();
  }

  load_account() {

    this.Notify.loadingPresent('loading ...');

    // Api connections
    this.authService.get_with_tokens('staff_boda_cleaning?client=web_admin').then((data: any) => {

      let myresponsedata: any = data;
      console.log(myresponsedata);

      // close load
      this.Notify.loadingDismiss();

      // if a 200 response is received then login user
      if (myresponsedata.code === 200) {
        // success message
        this.userdata = myresponsedata.loggedin;
        this.boda_data.ttl = myresponsedata.boda_price.boda_wash;
       this.boda_data.pay_contact = '0'+myresponsedata.loggedin.contact;
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

  pay(){
    if(this.boda_data.license === ""){
      this.Notify.toast_with_icon_color('close-circle','Missing boda license','danger')
    }else if(this.boda_data.pay_contact === ""){
      this.Notify.toast_with_icon_color('close-circle','Missing payment contact','danger')
    }else if(this.boda_data.ttl === ""){
      this.Notify.toast_with_icon_color('close-circle','Missing payment totals','danger')
  
    }else{
      this.pay_confirm();
    }


  }

  async pay_confirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Boda cleaning',
      message: 'Are you sure '+this.userdata.firstname+' you want to pay for boda cleaning?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Pay',
          handler: () => {
            console.log('Confirm Okay');
            this.pay_script();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  pay_script(){
  
    this.Notify.loadingPresent('Creating payment ...');
  
      // Api connections
      this.authService.post_with_tokens(this.boda_data, 'user_add_invoice').then((data: any) => {
  
      let myresponsedata: any = data;
      console.log(myresponsedata);
  
       // close load
      this.Notify.loadingDismiss();
     
      // if a 200 response is received then login user
      if (myresponsedata.code === 200) {
        // success message
        this.Notify.toast_with_icon_color('checkmark-circle',myresponsedata.msg,'linkedin');

        this.boda_data.license = "";
        this.boda_data.pay_contact = "";
        
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
