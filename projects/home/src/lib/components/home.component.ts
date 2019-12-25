import { ABP, Config, ConfigState } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppNavgationService, RanNavigationState } from 'projects/theme-basic/src/public-api';
import { Observable } from 'rxjs';
import { Home } from '../models/home.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'ran-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(RanNavigationState.getAppbarNavigationState)
  navigations$: Observable<ABP.FullRoute[]>;
  tenantApplications: Home.ITenantApplication[] = [];
  apiUrl: string;

  get navigations(): ABP.FullRoute[] {
    return this.store.selectSnapshot(RanNavigationState.getAppbarNavigationState);
  }

  get appInfo(): Config.Application {
    return this.store.selectSnapshot(ConfigState.getApplicationInfo);
  }

  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(
    private store: Store,
    private router: Router,
    private appNavigationService: AppNavgationService,
    private homeService: HomeService,
    private toasterService: ToasterService,
    private oAuthService: OAuthService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (!this.hasLoggedIn) {
      this.router.navigate(['/account/login'], {
        relativeTo: this.activatedRoute,
      });
    }
    this.apiUrl = this.store.selectSnapshot(ConfigState.getApiUrl());
    this.homeService.getTenantApplications().subscribe(reslut => {
      this.tenantApplications = reslut.items;
    });
  }

  navigationByRoute(item: Home.ITenantApplication) {
    const route = this.navigations.find(n => n.name === item.applicationName);
    if (route) {
      const url = this.appNavigationService.getNavigationUrlByRoute(route);
      this.router.navigateByUrl(url);
    } else {
      if (item.url) {
        window.location.href = item.url;
      } else {
        this.toasterService.warn('这是一个空链接', '提示');
      }
    }
  }

}
