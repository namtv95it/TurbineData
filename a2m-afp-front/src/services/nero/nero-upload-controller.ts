import { TccoFile } from "../../model/tccofile";


export interface NeroUploadController {
    upload: () => void;
    getData: () => Array<TccoFile>;
    setData: (files: Array<TccoFile>) => void;
    getDeletedData: () => Array<TccoFile>;
    getDataCurrent: () => Array<TccoFile>;
    needToUpload: () => boolean;
}