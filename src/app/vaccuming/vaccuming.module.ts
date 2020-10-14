import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VaccumingPage } from './vaccuming.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/tabs/components.module';

const routes: Routes = [
  {
    path: '',
    component: VaccumingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VaccumingPage]
})
export class VaccumingPageModule {}
