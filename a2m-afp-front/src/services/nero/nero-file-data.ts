import { TccoFile } from "../../model/tccofile";


export class NeroFileData {
    fileMngId?: string | null = null;
    uniqueIdentifier: string | null = null;
    fileName?: string | null = null;
    fileDesc?: string | null = null;
    fileType?: string | null = null;
    fileSize?: number | null = null;
    downloadSize?: number | null = null;
    fileSizeLabel: string | null = null;
    filePath?: string | null = null;
    uploadUser: string | null = null;
    uploadDate: number | null = null;
    status: string | null = null;
    contextPath?: string | null = null;
    baseControllerPath?: string | null = null;
    fileCheckSum: string | null = null;
    now: number | null = null;
    uploaded: boolean = false;

    public toTccoFile(): any {
        if (this == null) return null;
        let tccoFile: TccoFile = new TccoFile();
        tccoFile.atchFleSeq = this.uniqueIdentifier;
        tccoFile.fleNm = this.fileName;
        tccoFile.newFleNm = this.filePath;
        tccoFile.fleSz = this.fileSize + '';
        tccoFile.fleTp = this.fileType;
        tccoFile.flePath = this.filePath;

        return tccoFile;
    }

    public fromTccoFile(data: TccoFile): NeroFileData {
        if (data == null) return this;
        this.uniqueIdentifier = data.atchFleSeq;
        this.fileName = data.fleNm;
        this.filePath = data.newFleNm;
        this.fileSize = data.fleSz ? Number.parseInt(data.fleSz) : null;
        this.fileType = data.fleTp;
        this.uploadDate = data.createdDate ? Date.parse(data.createdDate) : null;
        this.uploaded = true;

        return this;
    }

    public fromObject(data: any): NeroFileData {
        if (!data) return this;
        Object.assign(this, data);

        return this;
    }
}