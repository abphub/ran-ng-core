import { Component, ContentChild } from '@angular/core';
import { PageSidebarComponent } from './page-sidebar.component';

@Component({
    selector: 'ran-page-content',
    templateUrl: './page-content.component.html',
    styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent {
    @ContentChild(PageSidebarComponent, { static: true }) pageSidebar: PageSidebarComponent;
}
