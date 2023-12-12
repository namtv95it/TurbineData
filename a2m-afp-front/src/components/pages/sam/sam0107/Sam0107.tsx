import React, { useEffect } from 'react'
import FooterHashTag from '../common/FooterHashTag'
import { A2mUpload } from '../../../../services/nero/a2mupload';
import { TccoFile } from '../../../../model/tccofile';
import { NeroUploadController } from '../../../../services/nero/nero-upload-controller';
import { TndmNotice } from '../../../../model/tndm-notice';
import { NeroUploadService } from '../../../../services/nero/neroupload.service';
import { toast, ToastContainer } from 'react-toastify';

export default function Sam0107() {

    let _dataLoaded: boolean = false;
    let _filesToAdd: Array<TccoFile> = [];
    let _filesToDelete: Array<TccoFile> = [];
    let _uploadBox: Promise<NeroUploadController>;
    const notice = new TndmNotice()

    useEffect(() => {
        let opts: A2mUpload = new A2mUpload();
        opts.onUploadComplete = (files) => {
            if (!files) return;
            _filesToAdd.push(...files);
            saveData();
        };
        opts.onDeleteComplete = (files) => {
            if (!files) return;
            let isArray: boolean = Array.isArray(files);
            if (!isArray) _filesToDelete.push(files);
            else _filesToDelete.push(...files);
            // clean up
            if (_filesToAdd) {
                let needDelete: number[] = [];
                _filesToAdd.forEach((f, index) => {
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
                needDelete.forEach((index) => {
                    _filesToAdd.splice(index, 1);
                });
            }
        };
        _uploadBox = NeroUploadService.getInstance().make('#attachment', opts);
        _uploadBox.then((controller) => {
            if (!controller) return;
            if (_dataLoaded) {
                if (!notice || !notice.attachment) return;
                controller.setData(notice.attachment);
            } else {
                let interval = setInterval(() => {
                    if (_dataLoaded) {
                        clearInterval(interval);
                        if (!notice || !notice.attachment) return;
                        controller.setData(notice.attachment);
                    }
                }, 100);
            }
        });
    }, []);

    const handleUpload = () => {
        if (_uploadBox) {
            // check if need to upload files
            _uploadBox.then((controller) => {
                if (!controller) {
                    // does not has a controller => save form data and quit
                    return;
                }
                if (controller.needToUpload()) {
                    // if need to upload => trigger upload event and call save form data in onUploadComplete callback
                    controller.upload();
                } else {
                    // do not need to upload files
                    // console.log("Save data");
                }
            });
        } else {
            // do not need to upload files
            // console.log("Save data");
        }
    }

    const saveData = () => {
        toast.success("Upload file success !!!")
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="card">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Nero Upload</h4>
                            </div>
                            <div className="col-lg-12">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <label htmlFor="content">
                                            <h3>
                                                Attachment
                                            </h3>
                                        </label>
                                        <div className='col-lg-6 mb-3' style={{ textAlign: 'end' }}>
                                            <button type="button" className="btn btn-forth btn-label rounded-pill waves-effect waves-light"
                                                onClick={handleUpload}><i className="mdi mdi-check label-icon align-middle rounded-pill fs-16 me-2"></i> Upload</button>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div >
                                            <div id="attachment"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <FooterHashTag />
        </>
    )
}
