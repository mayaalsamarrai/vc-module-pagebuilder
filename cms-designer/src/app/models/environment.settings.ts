export interface EnvironmentSettings {
    storeBaseUrl: string;
    storePreviewPath: string;
    contentCssPath: string;
    baseUrl: string;
    tokenUrl: string;
    previewTimeout: number;
}

export interface PlatformSetting {
    groupName: string;
    name: string;
    value: string;
    valueType: string;
    defaultValue: string;
    isArray: boolean;
    title: string;
    description: string;
}
