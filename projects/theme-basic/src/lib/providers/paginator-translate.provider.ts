import { LocalizationPipe } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

export function getPaginatorTranslateFactory(injector: Injector) {

    const localization = injector.get(LocalizationPipe);

    const dutchRangeLabel = (page: number, pageSize: number, length: number) => {

        if (length === 0 || pageSize === 0) { return `0 ${localization.transform('::-')} ${length}`; }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?

            Math.min(startIndex + pageSize, length) :

            startIndex + pageSize;

        return `${startIndex + 1} ${localization.transform('::-')} ${endIndex} ${localization.transform('::of')} ${length}`;
    };

    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = localization.transform('::ItemsPerPage');

    paginatorIntl.firstPageLabel = localization.transform('::PagerFirst');

    paginatorIntl.lastPageLabel = localization.transform('::PagerLast');

    paginatorIntl.previousPageLabel = localization.transform('::PagerPrevious');

    paginatorIntl.nextPageLabel = localization.transform('::PagerNext');

    paginatorIntl.getRangeLabel = dutchRangeLabel;

    return paginatorIntl;
}
