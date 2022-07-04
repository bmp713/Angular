import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor( public authService: AuthService ) {
    }

    ngOnInit() {
        console.log("Login component mounted");
    }

    signIn = () => {
        //e.preventDefault();

        console.log("Signin clicked");
    }

}



