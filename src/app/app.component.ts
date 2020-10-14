import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Boda cleaning',
      url: '/bodacleaning',
      icon: 'bicycle'
    },
    {
      title: 'Car cleaning',
      url: '/carcleaning',
      icon: 'car'
    },
    {
      title: 'Laundry',
      url: '/laundry',
      icon: 'shirt'
    },
    {
      title: 'Vaccuming',
      url: '/vaccuming',
      icon: 'infinite'
    },
   /*  {
      title: 'My Account',
      url: '/cleaning',
      icon: 'information-circle'
    } */
  
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navigationBar: NavigationBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // *************************
      this.statusBar.overlaysWebView(false);

      // set status bar to green
      this.statusBar.backgroundColorByHexString('#3f51b5');
      this.splashScreen.hide();
      // **************

      //set navigation to autohide
     // let autoHide: boolean = true;
    //  this.navigationBar.setUp(autoHide);
 

     // this.statusBar.styleDefault();
     // this.splashScreen.hide();
   
    });
  }
}
