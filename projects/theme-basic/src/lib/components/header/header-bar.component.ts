import { Component } from '@angular/core';

@Component({
    selector: 'ran-app-header-bar',
    templateUrl: './header-bar.component.html',
    styles: [
        '.active {}',
        '.active:hover {color: #1b9aee;}',
        '.bar-button {padding: 0 !important; min-width: 55px !important;line-height: 30px !important;margin-right: 10px;}'
    ]
})
export class AppHeaderBarComponent {

}
