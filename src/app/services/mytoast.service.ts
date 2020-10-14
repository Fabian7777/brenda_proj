import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MytoastService {
  isLoading = false;
  constructor(public loadingController: LoadingController, public toastCtrl: ToastController, private router: Router) { }

  async toast_with_icon_color(icon,parsedtest,mycolor) {
   
    let icn = '<ion-icon name="'+icon+'"></ion-icon>';
    const toast = await this.toastCtrl.create({
      message: icn + ' ' + parsedtest,
      duration: 3000,
      color: mycolor,
      position: 'bottom',
     // closeButtonText: 'Ok',
     // showCloseButton: true
    });
    toast.present();
  }

  process_errors(errordata){
    if(errordata.error.error){
      this.toast_with_icon_color('close-circle',errordata.error.error,'danger')

      if(errordata.error.error === "Access denied.Invalid request tokens"){
        this.router.navigate(['/login']);
      }

    }else{
      this.toast_with_icon_color('close-circle',errordata.name,'danger')
    }
   }

   async loadingPresent(mymessage) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: mymessage,
      spinner: 'bubbles',
      translucent: true,
      cssClass:'custom-loader-class'
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }

}
