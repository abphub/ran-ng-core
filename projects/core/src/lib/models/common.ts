import * as moment from 'moment';

export namespace RAN {

    export interface TableRowIndex {
        index: number;
    }

    export interface EntityDto<T = string> {
        id: T;
    }

    export interface IModificationAuditedDto<T = moment.Moment> {
        lastModificationTime?: T;
        lastModifierId?: string;
    }
    export interface ICreationAuditedDto<T = moment.Moment> {
        creationTime?: T;
        creatorId?: string;
    }

    export interface IDeletionAuditedDto<T = moment.Moment> {
        deletionTime?: T;
        isDeleted?: boolean;
        deleterId?: string;
    }

    export type IFullAuditedDto<T = moment.Moment> =
        IModificationAuditedDto<T> & ICreationAuditedDto<T> & IDeletionAuditedDto<T>;

    export type IFullAuditedEntityDto<M = moment.Moment, T = string> = EntityDto<T> & IFullAuditedDto<M>;
}
