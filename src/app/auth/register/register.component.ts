import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

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
    this.authService.createUser(data.name, data.email, data.password);
  }

}
