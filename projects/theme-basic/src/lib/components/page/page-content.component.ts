import { Component, ContentChild, HostBinding } from '@angular/core';
import { PageSidebarComponent } from './page-sidebar.component';

@Component({
    selector: 'ran-page-content',
    templateUrl: './page-content.component.html'
})
export class PageContentComponent {
    @ContentChild(PageSidebarComponent, { static: true }) pageSidebar: PageSidebarComponent;

    @HostBinding('class.d-flex')
    get pageSidebarComponent() {
        return this.pageSidebar;
    }
}
