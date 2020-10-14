import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MytoastService } from '../services/mytoast.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  activities:any;
  words = ["angular", "communication", "tooling", "services", "design", "workshop", "food","documentation","navigation"];
user_data: any;
users_invoices: Array<any> = [];
todaydate = new Date();

  constructor(private menuctrl: MenuController, public router: Router, public Notify: MytoastService, public authService: AuthService) {
    menuctrl.enable(true);
  }

  check_tokens(){
    const usertoken: string = JSON.parse(localStorage.getItem('device_token'));
    if (!usertoken){
      //no tokens logout user
      this.router.navigate(['/login']);
      return;

    }
  }

  get_random_word(){

    let selectedword = 0;
    selectedword = Math.floor(Math.random()*this.words.length);
    let random_word = this.words[selectedword];
    return random_word.toString();
  }

  ionViewDidEnter(){
  this.check_tokens();
  //load account 
  this.load_account();

  }
  
  ngOnInit() {
  }
  
  load_account() {

    this.Notify.loadingPresent('loading ...');

    // Api connections
    this.authService.get_with_tokens('user_account?client='+this.authService.client_id).then((data: any) => {

      let myresponsedata: any = data;
      console.log(myresponsedata);

      // close load
      this.Notify.loadingDismiss();

      // if a 200 response is received then login user
      if (myresponsedata.code === 200) {
        // success message
       this.user_data = myresponsedata.account;
       this.users_invoices = myresponsedata.invoices;
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
