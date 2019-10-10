import { Component, Injector, OnInit } from '@angular/core';
import { ModalService } from '@ran-ng/core';

@Component({
    selector: 'app-demo-core',
    templateUrl: './demo-core.component.html',
    styleUrls: ['./demo-core.component.scss']
})
export class DemoCoreComponent implements OnInit {


    constructor(
        public injector: Injector,
        public modalService: ModalService
    ) {
    }

    ngOnInit() {
        console.log(this.injector.get(ModalService));
    }

    protected getListResult(successCallback: (result: any[]) => void, finishedCallback?: () => void) {
        successCallback([]);
    }
}
