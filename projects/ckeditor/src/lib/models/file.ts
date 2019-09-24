export interface IFileDto {
    providerKey: string;
    folderId: string;
    name: string;
    size: 0;
    webUrl: string;
    creatorId: string;
    id: string;
}

export interface ILoadRemoteFile {
    url: string;
    providerKey: string;
    folderName: string;
}
