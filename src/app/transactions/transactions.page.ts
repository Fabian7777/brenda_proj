import { Component, OnInit } from '@angular/core';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  activities:any;
  words = ["angular", "communication", "tooling", "services", "design", "workshop", "food","documentation","navigation"];

users_transactions: Array<any> = [];

  constructor( public Notify: MytoastService, public authService: AuthService) { }

  ionViewDidEnter(){
   
    //load transactions 
    this.load_account();
  
    }
    
    ngOnInit() {
    }
    
    load_account() {
  
      this.Notify.loadingPresent('loading ...');
  
      // Api connections
      this.authService.get_with_tokens('user_transactions?client='+this.authService.client_id).then((data: any) => {
  
        let myresponsedata: any = data;
        console.log(myresponsedata);
  
        // close load
        this.Notify.loadingDismiss();
  
        // if a 200 response is received then login user
        if (myresponsedata.code === 200) {
          // success message
        
         this.users_transactions = myresponsedata.transactions;
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
