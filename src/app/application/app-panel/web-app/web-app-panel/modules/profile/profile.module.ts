import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    ProfilePageComponent, 

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ]
})
export class ProfileModule { }
