import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

    constructor( public authService: AuthService ) {
    }

    ngOnInit(): void {
        console.log("Reset component mounted");
    }

}



