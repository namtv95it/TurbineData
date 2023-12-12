
import { NeroUploadService } from './neroupload.service';

import { NeroUploadController } from './nero-upload-controller';

import { A2mUpload } from './a2mupload';
import { TccoFile } from '../../model/tccofile';


export class NeroUtil {

    // controllerUpload: NeroUploadController;
    controllerUpload: any;
    _dataLoaded: boolean = false;
    _filesToAdd: Array<TccoFile> = [];
    _filesToDelete: Array<TccoFile> = [];
    // _uploadBox: Promise<NeroUploadController>;
    _uploadBox: any;

    opts: A2mUpload = new A2mUpload();

    constructor(
        private neroUploadService: NeroUploadService) {

    }
    init(uploadId: string, files: Array<TccoFile> = []) {
        this.opts.onDeleteComplete = (files) => {
            if (!files) return;
            let isArray: boolean = Array.isArray(files);
            if (!isArray)
                this._filesToDelete.push(files);
            else
                this._filesToDelete.push(...files);
            // clean up
            if (this._filesToAdd) {
                let needDelete: number[] = [];
                this._filesToAdd.forEach((f, index) => {
                    if (!f) {
                        needDelete.push(index);
                        return;
                    }

                    if (!isArray) {
                        if (f.atchFleSeq == files.atchFleSeq) {
                            needDelete.push(index);
                        }
                    } else {
                        files.forEach((file: any) => {
                            if (!f) return;
                            if (f.atchFleSeq == file.atchFleSeq) {
                                needDelete.push(index);
                            }
                        });
                    }
                });

                needDelete.forEach(index => {
                    this._filesToAdd.splice(index, 1);
                });
            }
        };
        this._uploadBox = this.neroUploadService.make('#' + uploadId, this.opts);
        this._uploadBox.then((controller: any) => {
            if (!controller) return;
            this.controllerUpload = controller;
            if (this._dataLoaded) {
                if (!files) return;
                controller.setData(files);
            } else {
                let interval = setInterval(() => {
                    if (this._dataLoaded) {
                        clearInterval(interval);
                        if (files || files) return;
                        controller.setData(files);
                    }
                }, 100);
            }
        });
    }

    checkFileChanged(rootLength: number) {
        let check = false;
        if (rootLength != this.controllerUpload.getDataCurrent().length) {
            return true;
        }
        if (this._filesToDelete.length > 0) {
            return true;
        }
        return check;
    }

    checkFileJustDelete(rootLength: number) {
        if (this.controllerUpload.getDataCurrent().length + this._filesToDelete.length == rootLength) {
            return true;
        }
        return false;
    }

    getDataCurrent() {
        return this.controllerUpload.getDataCurrent();
    }
}