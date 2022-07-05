import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: any = [];

  constructor(
    public db: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,

    public authService: AuthService
  ){}


  ngOnInit(): void {
      this.readMessages();
  }

  // Read friends from Firestore to dsiplay in profile
  readMessages(){
    const docsRef = this.db.firestore.collection(`messages`)
        .get()
        .then( (docs) => {
            docs.forEach( (doc) => {
                console.log("message ", doc.id, "=>", doc.data());
                this.messages.push(doc.data());
              })
        })
  };

  // Assign user data to Firestore
  setMessage(uid:any, message:any){

      this.db.collection('users')
          .doc(uid)
          .set({
              uid: uid,
              message: message,
          })
          .then(() => {
              console.log(uid, "document created");
          }).catch(function(error) {
              console.error('setFirestoreData => ', error);
          });
  }
}



