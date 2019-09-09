import { Observable } from 'rxjs';

export abstract class PagedListingAsyncComponentBase<T> {
    isLoading = false;
    protected data$: Observable<T[]>;
    protected totalCount$: Observable<number>;
}