import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { MytoastService } from 'src/app/services/mytoast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(public actionSheetController: ActionSheetController,public navctrl: NavController,public mytoastservice: MytoastService, private router: Router) { }

  ngOnInit() {}

  async choose_cleaning() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Belin Laundries',
      buttons: [{
        text: 'Boda cleaning',
        icon: 'bicycle',
        handler: () => {
          console.log('boda clicked');
          this.navctrl.navigateForward('bodacleaning');
        }
      }, 
      {
        text: 'Car cleaning',
        icon: 'car',
        handler: () => {
          console.log('cars clicked');
          this.navctrl.navigateForward('carcleaning');
        },

      },
      {
        text: 'Laundry',
        icon: 'shirt',
        handler: () => {
          console.log('laundry clicked');  
          this.navctrl.navigateForward('laundry');
        },

      },
      {
        text: 'Vaccuming',
        icon: 'infinite',
        handler: () => {
          console.log('vaccuming clicked');
          this.navctrl.navigateForward('vaccuming');

        },

      }
      ]
    });
    await actionSheet.present();
  }

  app_status(){
    this.mytoastservice.toast_with_icon_color('checkmark-circle-outline','Your Belin laundry app service is Active','matfacebook')
  }

  open_transactions(){
    this.router.navigate(['/transactions']);
  }
  open_invoices(){
    this.router.navigate(['/invoices']);
  }

}
