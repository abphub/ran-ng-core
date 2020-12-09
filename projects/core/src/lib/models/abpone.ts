import { Config } from '@abp/ng.core';
export namespace Abpone {

    export interface Root {
        /**
         * 默认为false，则从系统Environment文件中取
         * 如果为true，则从assets/abpone.json中取
         * 如果为文件地址，则从文件地址中取
         */
        configFromJson?: boolean | string;
    }

    export interface Config {
        multiTenancy: MultiTenancyConfig;
        environment: EnvironmentConfig;
        // [key: string]: any;
    }

    export type ConfigState = Config;

    export interface MultiTenancyConfig {
        multiDomainsFormat: string[];
    }

    export interface EnvironmentConfig {
        /**
         * 开发环境配置
         */
        dev: Config.Environment;
        /**
         * 生产模式
         */
        prod: Config.Environment
    }
}