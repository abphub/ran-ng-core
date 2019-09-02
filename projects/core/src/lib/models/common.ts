import * as moment from 'moment';

export namespace RAN {

    export type Moment = moment.Moment;

    export interface IModificationAuditedObject {
        lastModificationTime?: Moment;
        lastModifierId?: string;
    }
    export interface ICreationAuditedObject {
        creationTime?: Moment;
        creatorId?: string;
    }

    export interface IDeletionAuditedObject {
        deletionTime?: Moment;
        isDeleted?: boolean;
        deleterId?: string;
    }
}
