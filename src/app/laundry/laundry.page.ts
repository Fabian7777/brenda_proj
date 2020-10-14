import { Component, OnInit } from '@angular/core';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.page.html',
  styleUrls: ['./laundry.page.scss'],
})
export class LaundryPage implements OnInit {

  laundry_data = {mode:'',additional:'',pay_contact:'',ttl:'',service:'Laundry cleaning'};
  userdata: any;
  laundry_list: Array<any>;

  selected_mode: any;

  constructor( public Notify: MytoastService, public authService: AuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.load_account();
   }
 
   load_account() {
 
     this.Notify.loadingPresent('loading ...');
 
     // Api connections
     this.authService.get_with_tokens('staff_laundry_cleaning?client=web_admin').then((data: any) => {
 
       let myresponsedata: any = data;
       console.log(myresponsedata);
 
       // close load
       this.Notify.loadingDismiss();
 
       // if a 200 response is received then login user
       if (myresponsedata.code === 200) {
         // success message
         this.userdata = myresponsedata.loggedin;
         this.laundry_data.pay_contact = myresponsedata.loggedin.contact;
         this.laundry_list = myresponsedata.laundry;
        
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
    
    if(this.selected_mode){
      console.log(this.selected_mode);

    let item1 = this.laundry_list.find(i => i.l_id === this.selected_mode);
    console.log(item1);
      this.laundry_data.ttl = item1.l_price;
      this.laundry_data.mode = item1.l_type;
    }


     if(this.laundry_data.mode === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing laundry mode','danger')    

     }else if(this.laundry_data.pay_contact === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing payment contact','danger')

     }else if(this.laundry_data.ttl === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing payment totals','danger')
   
     }else{
       this.pay_confirm();
     }
 
 
   }
 
   async pay_confirm() {
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Laundry cleaning',
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
       this.authService.post_with_tokens(this.laundry_data, 'user_add_invoice').then((data: any) => {
   
       let myresponsedata: any = data;
       console.log(myresponsedata);
   
        // close load
       this.Notify.loadingDismiss();
      
       // if a 200 response is received then login user
       if (myresponsedata.code === 200) {
         // success message
         this.Notify.toast_with_icon_color('checkmark-circle',myresponsedata.msg,'linkedin');
 
         this.laundry_data.additional = "";
         this.laundry_data.mode = "";
         
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
