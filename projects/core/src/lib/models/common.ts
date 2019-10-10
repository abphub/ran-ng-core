export namespace RAN {

    export interface EntityDto<T> {
        id: T;
    }

    export interface IModificationAuditedDto<T> {
        lastModificationTime?: T;
        lastModifierId?: string;
    }
    export interface ICreationAuditedDto<T> {
        creationTime?: T;
        creatorId?: string;
    }

    export interface IDeletionAuditedDto<T> {
        deletionTime?: T;
        isDeleted?: boolean;
        deleterId?: string;
    }

    export type IFullAuditedDto<T> =
        IModificationAuditedDto<T> & ICreationAuditedDto<T> & IDeletionAuditedDto<T>;

    export type IFullAuditedEntityDto<M, T> = EntityDto<T> & IFullAuditedDto<M>;
}
