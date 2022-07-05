import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

    friends: any[] = []

    constructor(
      public db: AngularFirestore,
      public auth: AngularFireAuth,
      public router: Router,) { }

    ngOnInit(): void {
        this.readFriends();
    }

    // Read friends from Firestore to dsiplay in profile
    readFriends(){
        const docsRef = this.db.firestore.collection(`friends`)
            .get()
            .then( (docs) => {
                docs.forEach( (doc) => {
                    console.log(doc.id, "=>", doc.data());
                    this.friends.push(doc.data());
                  })
            })
    };

    // Assign user data to Firestore
    setFriend(uid:any, first:string, last:string, email:string){
        this.db.collection('friends')
            .doc(uid)
            .set({
                uid: uid,
                email: email,
                first: first,
                last: last,
                photoURL: "",
                emailVerified: "",
            })
            .then(() => {
                console.log(uid, "document created");
            }).catch(function(error) {
                console.error('setFirestoreData => ', error);
            });
    }

}



