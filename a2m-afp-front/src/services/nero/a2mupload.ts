import { TccoFile } from "../../model/tccofile";


export class A2mUpload {
    /**
     * Whether use default upload button or custom upload button.
     * If set to true => use controller to upload
     */
    useCustomUploadButton?: boolean = false;

    /**
     * Input file name
     */
    inputName: string = "";

    /**
     * Time retry when upload the chunk has errors, default 500ms
     */
    chunkRetryInterval?: number = 500;

    /**
     * Maximum file size allowed (byte)
     */
    maxFileSize?: number = 100000000000;

    /**
     * Total file size allowed (byte)
     */
    totalMaxSize?: number = 100000000000;

    /**
     * Maximum number of file allow to upload, default 100 files
     */
    maxFileCount?: number = 100;

    /**
     * Default 1 file
     */
    minFileCount?: number = 1;

    /**
     * Blacklist of file extension by case sensitive
     */
    blacklistExt?: Array<string> = [];

    /**
     * Type of upload box.\n
     * Default is UploadBoxControlType.upload, if is UploadBoxControlType.download the box is only allow download and cannot delete or upload file
     */
    controlType?: UploadBoxControlType = UploadBoxControlType.upload;
    
    /**
     * Allow drag and drop file to the box to upload
     */
    allowFileDrop?: boolean = true;

    /**
     * The list of the file already uploaded, maybe a list select from DB
     */
    fileList?: Array<TccoFile>;

    /**
     * This event fired when all files upload process is done. 
     * uploaded => the files are uploaded
     */
    onUploadComplete?: (uploaded: Array<TccoFile>) => void;

    /**
     * This event fired when delete process is done. 
     * deletedFiles => Array<TccoFile> or TccoFile => the files are deleted
     */
    onDeleteComplete?: (deletedFiles: any) => void;

    /**
     * This event fired when upload process file error. 
     * remainFile => the file cannot delete
     */
    onDeleteError?: (remainFile: TccoFile) => void;
}

export enum UploadBoxControlType {
    upload = "UPLOADBOX",
    download = "DOWNLOADBOX"
}