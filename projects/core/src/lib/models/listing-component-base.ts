import { Observable } from 'rxjs';

export abstract class ListingComponentBase<T> {
    isLoading = false;
    protected abstract data$: Observable<T[]>;
}
