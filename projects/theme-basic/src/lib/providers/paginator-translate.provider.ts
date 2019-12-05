import { LocalizationPipe } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

export function getPaginatorTranslateFactory(injector: Injector) {

    const localization = injector.get(LocalizationPipe);

    const dutchRangeLabel = (page: number, pageSize: number, length: number) => {

        if (length === 0 || pageSize === 0) { return `0 ${localization.transform('Assets::-')} ${length}`; }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?

            Math.min(startIndex + pageSize, length) :

            startIndex + pageSize;

        return `${startIndex + 1} ${localization.transform('Assets::-')} ${endIndex} ${localization.transform('Assets::of')} ${length}`;
    };

    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = localization.transform('Assets::ItemsPerPage');

    paginatorIntl.firstPageLabel = localization.transform('Assets::PagerFirst');

    paginatorIntl.lastPageLabel = localization.transform('Assets::PagerLast');

    paginatorIntl.previousPageLabel = localization.transform('Assets::PagerPrevious');

    paginatorIntl.nextPageLabel = localization.transform('Assets::PagerNext');

    paginatorIntl.getRangeLabel = dutchRangeLabel;

    return paginatorIntl;
}
