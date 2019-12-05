import { Config, ConfigState, eLayoutType } from '@abp/ng.core';
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'ran-account-layout',
    templateUrl: './account-layout.component.html',
    styleUrls: ['./account-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccountLayoutComponent implements OnInit {
    static type = eLayoutType.account;

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    constructor(
        private store: Store,
        private hostElement: ElementRef<HTMLDivElement>,
        private renderer2: Renderer2
    ) {
    }

    ngOnInit() {
        this.setBackgroundImage();
    }

    setBackgroundImage() {
        const image = new Image();
        image.src = '/assets/images/bg_login.jpg';
        image.onload = () => {
            this.renderer2.setStyle(this.hostElement.nativeElement, 'background-image', `url(${image.src})`);
        };
    }
}
