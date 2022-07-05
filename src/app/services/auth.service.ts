import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    // Save logged in user data
    userData: any;
    userProvider: any;
    isUserLoggedIn: boolean = false;

    id: any;

    // Firestore documents
    document: any[] = [];

    constructor(
        // Inject Firestore service
        public db: AngularFirestore, public auth: AngularFireAuth, public router: Router,
    ){
        console.log("authService localstorage => ", JSON.parse(localStorage.getItem('user')!) );
        this.userData = JSON.parse(localStorage.getItem('user')!);
    }

    // Sign in with email/password
    logIn(email: string, password: string){
        return this.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(email, "logged in");

                this.isUserLoggedIn = true;
                this.id = result.user?.uid
                this.getFirestoreData(this.id);

                //console.log("logIn() this.userData =>", this.userData);
                localStorage.setItem('user', JSON.stringify(this.userData));
                console.log("logIn localstorage => ", JSON.parse(localStorage.getItem('user')!) );

                this.router.navigate(['profile']);
            }).catch((error) => {
              console.log(error.message);
            });
    }

    // Sign up with name and email/password
    async signUp(first: string, last: string, email: string, password: string){
        return this.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("createUserWithEmailAndPassword() user =>", result.user?.uid);

                this.setFirestoreData(result.user?.uid, first, last, email);
                this.logIn(email, password);
            })
            .catch((error) => {
                console.log("signUp() ", error.message);
            });
    }

    // Assign user data to Firestore
    setFirestoreData(uid:any, first:string, last:string, email:string){
        this.db.collection('users')
            .doc(uid)
            .set({
                uid: uid,
                email: email,
                first: first,
                last: last,
                photoURL: "../assets/Icon-headshot.png",
                emailVerified: "",
            })
            .then(() => {
                console.log(uid, "document created");
            }).catch(function(error) {
                console.error('setFirestoreData => ', error);
            });

            this.db.collection('friends')
            .doc(uid)
            .set({
                uid: uid,
                email: email,
                first: first,
                last: last,
                photoURL: "../assets/Icon-headshot.png",
                emailVerified: "",
            })
            .then(() => {
                console.log(uid, "document created");
            }).catch(function(error) {
                console.error('setFirestoreData => ', error);
            });
    }

    // Get user data from Firestore
    getFirestoreData(uid:any) {
        let docRef = this.db.collection('users')
            .doc(uid).ref
            .get()
            .then( (doc) => {
                console.log("getFirestoreData =>", doc.data());
                this.userData = doc.data();
                console.log("getFirestoreData this.userData =>", this.userData);
                localStorage.setItem('user', JSON.stringify(this.userData));
                console.log("localstorage => ", JSON.parse(localStorage.getItem('user')!) );

            }).catch(function (error) {
                console.log("getFirestoreData =>", error);
            });
    }

    // Sign out
    signOut() {
        return this.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
            console.log("logout localstorage => ", JSON.parse(localStorage.getItem('user')!) );

        });
    }

    // Send passwored reset email
    resetPassword(email: string){
        console.log("resetPassword() auth.service => ", email );

        return this.auth.currentUser
            .then((user: any) => user.sendEmailVerification())
            .then(() => {
            });
      };
}



