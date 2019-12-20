import { Component, OnInit } from '@angular/core';
import { Config, ABP, ConfigState } from '@abp/ng.core';
import { RanNavigationState } from 'projects/theme-basic/src/public-api';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppNavgationService } from 'projects/theme-basic/src/lib/services/navigation.service';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'ran-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(RanNavigationState.getAppbarNavigationState)
  navigations$: Observable<ABP.FullRoute[]>;

  get appInfo(): Config.Application {
    return this.store.selectSnapshot(ConfigState.getApplicationInfo);
  }

  constructor(
    private store: Store,
    private router: Router,
    private appNavigationService: AppNavgationService
  ) {
  }

  ngOnInit(): void {

  }

  navigationByRoute(route: ABP.FullRoute) {
    const url = this.appNavigationService.getNavigationUrlByRoute(route);
    this.router.navigateByUrl(url);
  }

}
