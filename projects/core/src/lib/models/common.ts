
export namespace RAN {

    export interface IModificationAuditedObject<T> {
        lastModificationTime?: T;
        lastModifierId?: string;
    }
    export interface ICreationAuditedObject<T> {
        creationTime?: T;
        creatorId?: string;
    }

    export interface IDeletionAuditedObject<T> {
        deletionTime?: T;
        isDeleted?: boolean;
        deleterId?: string;
    }

    export type IFullAuditedObject<T> =
        IModificationAuditedObject<T> & ICreationAuditedObject<T> & IDeletionAuditedObject<T>;
}
