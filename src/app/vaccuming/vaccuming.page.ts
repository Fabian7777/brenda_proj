import { Component, OnInit } from '@angular/core';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vaccuming',
  templateUrl: './vaccuming.page.html',
  styleUrls: ['./vaccuming.page.scss'],
})
export class VaccumingPage implements OnInit {

  vacuum_data = {carpet_type:'',carpet_size:'',pay_contact:'',ttl:'',service:'Vacuum cleaning'};
  userdata: any;

  carpet_types: Array<any>;
  carpet_sizes: Array<any>;

  selected_carpet_size: any;
  selected_carpet_type: any;

  constructor( public Notify: MytoastService, public authService: AuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.load_account();
   }
 
   load_account() {
 
     this.Notify.loadingPresent('loading ...');
 
     // Api connections
     this.authService.get_with_tokens('staff_vacuum_cleaning?client=web_admin').then((data: any) => {
 
       let myresponsedata: any = data;
       console.log(myresponsedata);
 
       // close load
       this.Notify.loadingDismiss();
 
       // if a 200 response is received then login user
       if (myresponsedata.code === 200) {
         // success message
         this.userdata = myresponsedata.loggedin;
         this.carpet_types = myresponsedata.types;
         this.carpet_sizes = myresponsedata.sizes;
         this.vacuum_data.pay_contact = myresponsedata.loggedin.contact;
        
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
    
    if(this.selected_carpet_type && this.selected_carpet_size){
      console.log(this.selected_carpet_type);

    let item1 = this.carpet_types.find(i => i.ct_id === this.selected_carpet_type);
    console.log(item1);

    this.vacuum_data.carpet_type = item1.ct_name;

    let item2 = this.carpet_sizes.find(i => i.cz_id === this.selected_carpet_size);
    console.log(item2);

    this.vacuum_data.carpet_size = item2.cz_det;
    this.vacuum_data.ttl = item2.cz_price;

    }


     if(this.vacuum_data.carpet_type === "" || this.vacuum_data.carpet_size === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing carpet type or carpet size','danger')    

    
     }else if(this.vacuum_data.ttl === ""){
       this.Notify.toast_with_icon_color('close-circle','Missing payment totals','danger')
   
     }else{
       this.pay_confirm();
     }
 
 
   }
 
   async pay_confirm() {
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Vacuum cleaning',
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
       this.authService.post_with_tokens(this.vacuum_data, 'user_add_invoice').then((data: any) => {
   
       let myresponsedata: any = data;
       console.log(myresponsedata);
   
        // close load
       this.Notify.loadingDismiss();
      
       // if a 200 response is received then login user
       if (myresponsedata.code === 200) {
         // success message
         this.Notify.toast_with_icon_color('checkmark-circle',myresponsedata.msg,'linkedin');
 
        
         
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
