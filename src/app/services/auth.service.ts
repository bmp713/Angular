import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { query, where, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc, collection } from 'firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // Save logged in user data
    userProvider: any;

    // Firestore documents
    document: any[] = [];

    constructor(
        // Inject Firestore service
        public db: AngularFirestore,

        // Inject Firebase auth service
        public auth: AngularFireAuth,
        public router: Router,
    )
    {
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

        this.db.collection("users")
            .get()
            .subscribe( (snapshot) => {
                snapshot.docs.forEach( (doc) => {
                    this.document.push(doc.data());
                });
            });
    }

    // Sign in with email/password
    logIn(email: string, password: string){
        return this.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(email, "logged in");

                this.router.navigate(['profile']);
                //this.setUserData(result.user);

            }).catch((error) => {
              console.log(error.message);
            });
    }

    setUserData(user: any, first:string, last:string) {
        const userRef: AngularFirestoreDocument = this.db.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            first: first,
            last: last,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        };
        return userRef.set(userData, {
            merge: true,
        });
    }

    // Sign out
    signOut() {
        return this.auth.signOut().then(() => {
            //localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }

    // Sign up with email/password
    async signUp(first: string, last: string, email: string, password: string){
        console.log("signUp() auth.service => ", first, last, email, password );

        return this.auth.createUserWithEmailAndPassword(email, password)
            .then( (result) => {
                console.log("createUserWithEmailAndPassword() user =>", result.user);

                //this.SendVerificationMail();
                this.setUserData(result.user, first, last);

                this.createUserFirebase( this.userProvider.uid, first, last, email);
                //sendEmailVerification(auth.currentUser);
                this.logIn(email, password);
            })
            .catch((error) => {
                console.log("signUp() ", error.message);
            });
    }

    // Create user additional profile data in users db
    async createUserFirebase( id: string, first: string, last: string, email: string ){
        this.db.collection('users').add({
            id: id,
            email: email,
            first: first,
            last: last,
        })
        .then(res => {
            console.log("createUserFirebase =>", res);
        }).catch(e => {
            console.log("createUserFirebase ", e);
        })
    };

    // Send passwored reset email
    resetPassword(email: string){
        console.log("resetPassword() auth.service => ", email );

        return this.auth.currentUser
            .then((user: any) => user.sendEmailVerification())
            .then(() => {
            });
      };
}



