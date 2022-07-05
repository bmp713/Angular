import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: any[] = []

    constructor(
      public db: AngularFirestore,
      public auth: AngularFireAuth,
      public router: Router,) { }

    ngOnInit(): void {
        this.readUsers();
    }

    // Read friends from Firestore to dsiplay in profile
    readUsers(){
        const docsRef = this.db.firestore.collection(`users`)
            .get()
            .then( (docs) => {
                docs.forEach( (doc) => {
                    console.log(doc.id, "=>", doc.data());
                    this.users.push(doc.data());
                  })
            })
    };

    // Assign user data to Firestore
    setUser(uid:any, first:string, last:string, email:string){
        this.db.collection('users')
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



