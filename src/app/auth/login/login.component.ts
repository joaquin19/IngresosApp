import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  charging: boolean;
  subscription: Subscription;

  constructor(public authService: AuthService,
              public store: Store<AppState>) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.subscription = this.store.select('ui')
        .subscribe(ui => this.charging = ui.isLoading);
  }

  onSubmit(data: any) {
    this.authService.loginUser(data.email, data.password);
  }

}
