import { Observable } from 'rxjs';

export abstract class ListingAsyncComponentBase<T> {
    isLoading = false;
    protected data$: Observable<T[]>;
    protected dataLength$: Observable<number>;
}