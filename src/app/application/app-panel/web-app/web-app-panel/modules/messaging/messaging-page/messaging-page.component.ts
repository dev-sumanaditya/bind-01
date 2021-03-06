import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';

import { AppChatsState } from '../../../store/state/application.state';
import * as AppActions from '../../../store/actions/application.actions';


import { MgsMainService } from '../../../services/pages/messaging/mgs-main.service';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css']
})
export class MessagingPageComponent implements OnInit {


  groups = [];
  directs = [];
  archives = [];

  new = false;
  step = false;
  participantsss = [];

  contacts = [
    {name: 'Aditya Suman', title: 'Frontend developer', url: 'https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg'},
    {name: 'Abhishek Singh', title: 'Data scientist', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTG0j1MmEng29JZuTbH7KqM55WOrUD7XfxtzOseyZeuFWJPv7'},
    {name: 'Ankit Kumar Sinha', title: 'Finance associate and Sales', url: 'https://i.cricketcb.com/stats/img/faceImages/6326.jpg'},
    {name: 'Rishav Singh', title: 'Human resource', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ'},
    {name: 'Bikas Phukan', title: 'Full stack developer', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPopGZ0K6fX5NrY0IBGKjX_AhqEJsZ_MOQTKdaZRHE_GlxEHAv'},
    {name: 'John doe', title: 'Intern at Bind', url: 'https://www.templatebeats.com/files/images/profile_user.jpg'},
    {name: 'Lucky Dangi', title: 'BDA at Bind', url: 'https://img.timesnownews.com/story/1550914828-Ananya_Panday.JPG?d=450x450'},
    {name: 'Aditya Suman', title: 'Frontend developer', url: 'https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg'},
    {name: 'Abhishek Singh', title: 'Data scientist', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTG0j1MmEng29JZuTbH7KqM55WOrUD7XfxtzOseyZeuFWJPv7'},
    {name: 'Ankit Kumar Sinha', title: 'Finance associate and Sales', url: 'https://i.cricketcb.com/stats/img/faceImages/6326.jpg'},
    {name: 'Rishav Singh', title: 'Human resource', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_nySYgvYJrWrRbDDBoo1izr89qHXzS_GujLRyi2JcrDv3QVmrQ'},
    {name: 'Bikas Phukan', title: 'Full stack developer', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPopGZ0K6fX5NrY0IBGKjX_AhqEJsZ_MOQTKdaZRHE_GlxEHAv'},
    {name: 'John doe', title: 'Intern at Bind', url: 'https://www.templatebeats.com/files/images/profile_user.jpg'},
    {name: 'Lucky Dangi', title: 'BDA at Bind', url: 'https://img.timesnownews.com/story/1550914828-Ananya_Panday.JPG?d=450x450'},
  ];

  

  private showArchive;
  private showSearch;
  private showChatsList;
  private showCreateGroup;
  private showCreateDirect;

  @ViewChild('searchBar') searchBar:ElementRef;

  constructor(private store: Store , private msgService: MgsMainService) {

    this.store.select(AppChatsState.getApplicationChatsState).subscribe(
      val => {
        this.showArchive = val.showArchive;
        this.showSearch = val.showSearch;
        this.showChatsList = val.showChatsList;
        this.showCreateGroup = val.showCreateGroup;
        this.showCreateDirect = val.showCreateDirect;
      }
    )

    this.msgService.getGroupList().subscribe(
      data => {
        this.groups = data;
      }
    )
    this.msgService.getDirectList().subscribe(
      data => {
        this.directs = data;
      }
    )
    this.msgService.getArchiveList().subscribe(
      data => {
        this.archives = data;
        console.log(data);
      }
    )
  }

  ngOnInit() {
    this.msgService.getData();
  }


  // Actions

  ShowArchives() {
    this.store.dispatch(new AppActions.ShowArchive);
    this.msgService.getArchData();
  }
  HideArchives() {
    this.store.dispatch(new AppActions.HideArchive);
  }
  ShowSearch() {
    this.store.dispatch(new AppActions.ShowSearch);
  }
  HideSearch() {
    this.store.dispatch(new AppActions.HideSearch);
  }
  ShowCreateGroup() {
    this.store.dispatch(new AppActions.ShowCreateGroup);
    this.new = false;
  }
  HideCreateGroup() {
    this.store.dispatch(new AppActions.HideCreateGroup);
  }
  ShowCreateDirect() {
    this.store.dispatch(new AppActions.ShowCreateDirect);
    this.new = false;
  }
  HideCreateDirect() {
    this.store.dispatch(new AppActions.HideCreateDirect);
  }

  showDropdown() {
    this.new = !this.new;
    this.step = false;
  }
  newClickOutside(data) {
    if(this.new) {
      this.new = false;
    }
  }
  nextStep() {
    this.step = true;
  }

  addParticipant(user, i) {
    this.participantsss.push(user);
    this.contacts.splice(i, 1);
  }
  pop(i, u) {
    this.participantsss.splice(i, 1);
    this.contacts.push(u)
  }


  search() {
    let val = this.searchBar.nativeElement.value;
    if(val.length > 0) {
      this.ShowSearch();
    } else {
      this.HideSearch();
    }
  }

}
