import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ran-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

    // 返回按钮
    @Input() showBackButton: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                if (this.showBackButton !== undefined) {
                    return;
                }

                let showBackButton = false;

                /**
                 * 判断是否有查询参数
                 */
                if (window.location.search.length > 0) {
                    showBackButton = true;
                }

                /**
                 * 判断是否有id参数
                 */
                this.activatedRoute.params.subscribe(result => {
                    if (Object.keys(result).length > 0) {
                        showBackButton = true;
                    }
                    return;
                });

                this.showBackButton = showBackButton;
            });
    }

    back() {
        history.back();
    }
}
