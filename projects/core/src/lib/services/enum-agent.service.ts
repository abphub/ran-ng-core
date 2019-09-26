export interface IEnumAgent {

    // 名称
    displayName: string;

    // enumKey
    enumKey?: string;

    // enumValue
    enumValue: number;
}

export interface IQueryEnumAgent {
    displayName?: string;
    enumKey?: string;
    enumValue?: number;
    valueRange?: {
        minValue?: number;
        maxValue?: number;
        // 需要返回的下标数组
        positionIndex?: number[]
    };
}

export interface IEnumAgentService {
    getService(): EnumAgentService;
}

//  不支持注入的service
export class EnumAgentService {

    enumAgents: IEnumAgent[] = [];

    constructor(enumAgents: IEnumAgent[]) {
        this.enumAgents = enumAgents;
    }

    getEnumAgents(query: IQueryEnumAgent): IEnumAgent[] {

        let result = this.enumAgents;

        if (query.displayName) {
            result = result.filter(m => m.displayName === query.displayName);
        }

        if (query.enumKey) {
            result = result.filter(m => m.enumKey === query.enumKey);
        }

        if (query.enumValue) {
            result = result.filter(m => m.enumValue === query.enumValue);
        }

        if (query.valueRange) {

            if (query.valueRange.minValue) {
                result = result.filter(m => m.enumValue >= query.valueRange.minValue);
            }

            if (query.valueRange.maxValue) {
                result = result.filter(m => m.enumValue <= query.valueRange.maxValue);
            }

            if (query.valueRange.maxValue) {
                // this.
            }

        }

        return result;
    }

    getEnumAgentByEnumKey(enumKey: string | number): IEnumAgent {
        return this.enumAgents.find(n => n.enumKey === enumKey);
    }

    getEnumAgentByEnumValue(enumValue: number) {
        return this.enumAgents.find(n => n.enumValue === enumValue);
    }

    getDisplayNameByEnumKey(enumKey: string | number): string {
        const result = this.getEnumAgentByEnumKey(enumKey);
        return result ? result.displayName : undefined;
    }

    getDisplayNameByEnumValue(enumValue: number) {
        const result = this.getEnumAgentByEnumValue(enumValue);
        return result ? result.displayName : undefined;
    }
}
