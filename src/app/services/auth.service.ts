import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../services/user';
import * as auth from 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // Save logged in user data
    userProvider: any;

    constructor(
        // Inject Firestore service
        public afs: AngularFirestore,

        // Inject Firebase auth service
        public auth: AngularFireAuth,
        public router: Router,
    ){
        this.auth.authState.subscribe((user) => {
          if(user){
              this.userProvider = user;

              // localStorage.setItem('user', JSON.stringify(this.userProvider));
              // JSON.parse(localStorage.getItem('user')!);
          }else{
              // localStorage.setItem('user', 'null');
              // JSON.parse(localStorage.getItem('user')!);
          }
        });
    }

    // Sign in with email/password
    signIn(email: string, password: string) {
        return this.auth
            .signInWithEmailAndPassword(email, password)
                .then((result) => {
                    console.log(email, "logged in");

                    this.router.navigate(['profile']);
                    //this.setUserData(result.user);

                }).catch((error) => {
                  window.alert(error.message);
                });
    }

    setUserData(user: any) {
        // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        //     `users/${user.uid}`
        // );
        // const userData: User = {
        //     uid: user.uid,
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //     emailVerified: user.emailVerified,
        // };
        // return userRef.set(userData, {
        //     merge: true,
        // });
    }


      // Sign up with email/password
    signUp(first: string, last: string, email: string, password: string) {

        console.log("signUp() auth.service => ", first, last, email, password );

        return this.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                //this.SendVerificationMail();
                //this.SetUserData(result.user);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }


}



