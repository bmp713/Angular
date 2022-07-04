import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { MessagesComponent } from '../components/messages/messages.component';
// import { FriendsComponent } from '../components/friends/friends.component';
// import { GalleryComponent } from '../components/gallery/gallery.component';
// import { UsersComponent } from '../components/users/users.component';
// import { ImageComponent } from '../components/image/image.component';
// import { NewsComponent } from '../components/news/news.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( public auth: AngularFireAuthModule ) {}

  ngOnInit(): void {
      console.log("Profile component mounted");
  }

}



