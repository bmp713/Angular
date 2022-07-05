import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(
    public db: AngularFirestore,
    public auth: AngularFireAuth,
    public authService: AuthService,
    public router: Router,
  ){}
  ngOnInit(): void {
  }

}



