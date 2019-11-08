import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aws-academe';
  signedIn: boolean;
    user: any;
    greeting: string;
    constructor( private amplifyService: AmplifyService ) {
        this.amplifyService.authStateChange$
            .subscribe(authState => {
                this.signedIn = authState.state === 'signedIn';
                if (!authState.user) {
                    this.user = null;
                } else {
                    this.user = authState.user;
                    this.greeting = "Hello " + this.user.username;
                    this.getCourses();
                }
        });
    }
    async getCourses() {
        const data = await API.get('academecourses','/academecourses','');

    }
}
