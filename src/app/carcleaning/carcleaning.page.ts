import { Component, OnInit } from '@angular/core';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carcleaning',
  templateUrl: './carcleaning.page.html',
  styleUrls: ['./carcleaning.page.scss'],
})
export class CarcleaningPage implements OnInit {

  car_data = {license:'',pay_contact:'',ttl:'',model_name:'',service:'Car cleaning'};
  userdata: any;
  cars_list: Array<any>;

  selected_car: any;


  constructor( public Notify: MytoastService, public authService: AuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.load_account();
   }
 
   load_account() {
 
     this.Notify.loadingPresent('loading ...');
 
     // Api connections
     this.authService.get_with_tokens('staff_car_cleaning?client=web_admin').then((data: any) => {
 
       let myresponsedata: any = data;
       console.log(myresponsedata);
 
       // close load
       this.Notify.loadingDismiss();
 
       // if a 200 response is received then login user
       if (myresponsedata.code === 200) {
         // success message
         this.userdata = myresponsedata.loggedin;
         this.car_data.pay_contact = myresponsedata.loggedin.contact;
         this.cars_list = myresponsedata.cars;
        
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
 
   onChange(){
    
  } 

   pay(){
    
    if(this.selected_car){
      console.log(this.selected_car);

    let item1 = this.cars_list.find(i => i.cr_id === this.selected_car);
    console.log(item1);

    this.car_data.model_name = item1.cr_name;
    this.car_data.ttl = item1.cr_price;
    }


     if(this.car_data.license === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing car license','danger')

      }else if(this.car_data.model_name === ""){
        this.Notify.toast_with_icon_color('close-circle','Missing model selection','danger')

     }else if(this.car_data.pay_contact === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing payment contact','danger')

     }else if(this.car_data.ttl === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing payment totals','danger')
   
     }else{
       this.pay_confirm();
     }
 
 
   }
 
   async pay_confirm() {
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Car cleaning',
       message: 'Are you sure '+this.userdata.firstname+' you want to pay for car cleaning?',
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
       this.authService.post_with_tokens(this.car_data, 'user_add_invoice').then((data: any) => {
   
       let myresponsedata: any = data;
       console.log(myresponsedata);
   
        // close load
       this.Notify.loadingDismiss();
      
       // if a 200 response is received then login user
       if (myresponsedata.code === 200) {
         // success message
         this.Notify.toast_with_icon_color('checkmark-circle',myresponsedata.msg,'linkedin');
 
         this.car_data.license = "";
         this.car_data.pay_contact = "";
         
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
