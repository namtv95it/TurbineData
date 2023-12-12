

import axios from 'axios';
import $ from 'jquery';
import { TccoFile } from '../../model/tccofile';
import { A2mUpload, UploadBoxControlType } from './a2mupload';
import { NeroFileData } from './nero-file-data';
import { NeroUploadController } from './nero-upload-controller';
// declare var $: any;
declare const window: any;
window.$ = window.jQuery = $;


export class NeroUploadService {

  __currentUploadBox: string = "";

  private static _neroUploadService: NeroUploadService

  public static getInstance(): NeroUploadService {
    if (!NeroUploadService._neroUploadService) {
      NeroUploadService._neroUploadService = new NeroUploadService()
    }
    return NeroUploadService._neroUploadService;
  }

  constructor() {
    this.includeLibraries();
  }

  /**
   * Make upload box for selector.
   * 
   * @param selector is a jQuery selector
   * @param opts upload config options and callback handlers
   */
  public make(selector: string, opts: A2mUpload): Promise<NeroUploadController> {
    if (!selector)
      throw new Error('"selector" parameter is required!');

    let __this = this;
    let controller: NeroUploadController;

    return new Promise((resolve, reject) => {
      $(document).ready(() => {
        let interval = setInterval(() => {
          // $.isFunction($.fn['A2mUpload'])
          if (true) {
            clearInterval(interval);
            $(document).off('click', '.largefileupload-close-on'); // remove previous event
            $(document).on('click', '.largefileupload-close-on', () => {
              let uploadedData = this.getUploadedData(__this.__currentUploadBox);
              let newData = this.getUploadFiles(__this.__currentUploadBox);
              let saveData = newData.map(obj => new NeroFileData().fromObject(obj).toTccoFile()).map(file => file.toMap());
              __this.saveFiles(saveData).then(resp => {
                if (!resp.data['status'] || resp.data['status'] !== true) {
                  alert('Cannot save files data to DB!\nPlease refresh and try again.');
                  return;
                }

                if (!resp.data['responseData'] || !Array.isArray(resp.data['responseData'])) {
                  alert('Cannot parse response data!');
                  return;
                }

                let responseData: Array<any> = resp.data['responseData'];
                let neroFilesData: Array<NeroFileData> = responseData.map(obj => new TccoFile().fromMap(obj)).map(obj => new NeroFileData().fromTccoFile(obj));
                neroFilesData.forEach(obj => {
                  let index: number = this.getIndexByFileName(uploadedData, obj.filePath || "");
                  if (index != -1) {
                    uploadedData.splice(index, 1, obj);
                  } else {
                    uploadedData.push(obj);
                  }
                });

                $(__this.__currentUploadBox).data('dms').reset();
                $(__this.__currentUploadBox).data('dms').setData(uploadedData);
                $(__this.__currentUploadBox).data('dms').refreshUI();

                let $opts = $(__this.__currentUploadBox).data('opts');
                if ($opts.onUploadComplete) {
                  $opts.onUploadComplete(neroFilesData.map(obj => new NeroFileData().fromObject(obj).toTccoFile()));
                }
                // if (opts.onUploadComplete) {
                //   opts.onUploadComplete(neroFilesData.map(obj => new NeroFileData().fromObject(obj).toTccoFile()));
                // }
              }, error => {
                alert('Error occurred when save files data!\n' + error);

                let $opts = $(__this.__currentUploadBox).data('opts');
                if ($opts.onUploadComplete) {
                  $opts.onUploadComplete([]);
                }
                // if (opts.onUploadComplete) {
                //   opts.onUploadComplete([]);
                // }
              });
            });
            draw(selector);
          }
        }, 100);

        function draw(selector: string) {
          let deletedData: any[] = [];
          let $selector: any;
          try {
            $selector = $(selector);
          } catch (error) {
            throw new Error(`Cannot find "${selector}" in the document!`);
          }
          if (!$selector || !$selector.length) {
            throw new Error(`Cannot find "${selector}" in the document!`);
          }

          if (!opts) {
            opts = new A2mUpload();
            opts.inputName = Math.random().toString(36).substring(7);
          } else {
            if (!opts.inputName)
              opts.inputName = Math.random().toString(36).substring(7);
          }

          $selector.data('opts', opts);
          $selector.A2mUpload({
            inputName: opts.inputName,
            chunkRetryInterval: opts.chunkRetryInterval,
            maxChunkRetries: 5,
            maxFileSize: opts.maxFileSize,
            maxFileCount: opts.maxFileCount,
            minFileCount: opts.minFileCount,
            totalMaxSize: opts.totalMaxSize,
            blockPolicy: 'black',
            blackExtension: opts.blacklistExt,
            whiteExtension: [],
            controlType: opts.controlType,
            dropAreaView: opts.allowFileDrop,
            onUploadComplete: function () {
              // let data = __this.getUploadedData(selector);
              // if (opts.onUploadComplete) {
              //   //opts.onUploadComplete(data);
              // }

              // let saveData = data.map(obj => new NeroFileData().fromObject(obj).toTccoFile()).map(file => file.toMap());
              // __this.saveFiles(saveData).subscribe(resp => {
              // });
              // __this.__currentUploadBox = selector;
            },
            onDeleteComplete: function (dms: any, deletedFiles: Array<NeroFileData>) {
              let deletedList = deletedFiles?.map(f => f.toTccoFile());
              deletedList.forEach(obj => deletedData.push(obj));

              let $opts = $selector.data('opts');
              if ($opts.onDeleteComplete)
                $opts.onDeleteComplete(deletedList);
              // if (opts.onDeleteComplete)
              //   opts.onDeleteComplete(deletedList);
            },
            onDeleteError: function (dms: any, remainFile: NeroFileData) {
              let $opts = $selector.data('opts');
              if ($opts.onDeleteError)
                $opts.onDeleteError(remainFile?.toTccoFile());
              // if (opts.onDeleteError)
              //   opts.onDeleteError(remainFile?.toTccoFile());
            }
          });

          // init files
          if (opts.fileList && opts.fileList.length) {
            $selector.data('dms').setData(opts.fileList.map(f => new NeroFileData().fromTccoFile(f)));
          }

          // append upload button
          if (opts.controlType != UploadBoxControlType.download && !opts.useCustomUploadButton) {
            let $wrapper = $('<div></div>');
            $wrapper.css({ height: '38px', margin: '10px 0' });
            let $uploadBtn = $('<a href="javascript:void(0);"></a>');
            $uploadBtn.append('<img src="/assets/nero/images/upload.png" style=" padding-right:4px" alt="파일 추가"> Upload');
            $uploadBtn.css({
              width: '13%',
              height: '100%',
              background: '#323a47',
              border: '1px solid #131822',
              display: 'inline-block',
              'text-align': 'center',
              'vertical-align': 'middle',
              'border-radius': '3px',
              'line-height': '32px',
              'text-decoration': 'none',
              color: 'white',
              'margin-right': '15px',
              'min-width': '110px',
            });
            $uploadBtn.bind('click', function () {
              $selector.data('dms').upload(() => __this.__currentUploadBox = selector);
            });
            //$wrapper.append($uploadBtn);
            //$wrapper.insertAfter($selector);
          }

          controller = {
            upload: () => {
              $selector.data('dms').upload(() => __this.__currentUploadBox = selector);
            },
            getData: () => __this.getUploadedData(selector).map(obj => new NeroFileData().fromObject(obj).toTccoFile()),
            setData: (files) => {
              if (!files) return;
              let fileSet: Array<NeroFileData> = files.map(f => new NeroFileData().fromTccoFile(f));
              if (!fileSet || !$selector.data('dms')) return;
              $selector.data('dms').setData(fileSet);
            },
            getDeletedData: () => deletedData,
            getDataCurrent: () => __this.getCurrentFiles(selector).map(obj => new NeroFileData().fromObject(obj).toTccoFile()),
            needToUpload: () => {
              let data: Array<any> = $selector.data('dms').getData();
              if (!data) return false;
              let needUpload = false;
              // check if has new files need to upload
              for (let i = 0; i < data.length; i++) {
                if (data[i].hasOwnProperty('isUploaded') && data[i]['isUploaded'] === false) {
                  needUpload = true;
                  break;
                }
              }

              return needUpload;
            },
          };

          // resolve
          return resolve(controller);
        }
      });
    });
  }

  private saveFiles(data: object): Promise<any> {
    // const url = environment.apiHost + '/common/file-service/saveFiles';
    // return this.http.post(url, data);
    return axios.post(process.env.REACT_APP_MAIN_URL + "/common/file-service/saveFiles", data)
  }

  private getIndexByFileName(data: Array<any>, fileName: string): number {
    if (!data || !fileName) return -1;
    let index: number = -1;
    data.forEach((obj, idx) => {
      if (fileName === obj['fileName']) {
        index = idx;
        return;
      }
    });

    return index;
  }

  private getUploadFiles(selector: string): Array<any> {
    if (!selector) return [];
    let currentData = $(selector).data('dms').getData();
    if (!currentData) return [];
    let newData = [];
    for (let obj of currentData) {
      if (!obj || !obj['obj']) continue;
      if (!obj['isUploaded'] || obj['isUploaded'] !== true || !obj['obj']) continue;

      if (obj['obj']['uploaded'] !== true) {
        newData.push(obj['obj']);
      }
    }

    return newData;
  }

  private getCurrentFiles(selector: string): Array<any> {
    if (!selector) return [];
    let currentData = $(selector).data('dms').getData();
    return currentData;
  }

  private getUploadedData(selector: string): Array<any> {
    if (!selector) return [];
    let currentData = $(selector).data('dms').getData();
    if (!currentData) return [];
    let newData = [];
    for (let obj of currentData) {
      if (!obj) continue;
      if (!obj['isUploaded'] || obj['isUploaded'] !== true || !obj['obj']) continue;

      if (obj['obj']['uploaded'] === true) {
        newData.push(obj['obj']);
      }
    }

    return newData;
  }

  private includeLibraries() {
    // CSS
    this.appendCSS(process.env.PUBLIC_URL + '/assets/nero/css/A2mUpload.css');

    // JS
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/message-kr.js');
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/message-jp.js');
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/message-en.js');
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/message-de.js');
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/uploadConfig.js');
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/designConfig.js');
    this.appendJS(process.env.PUBLIC_URL + '/assets/nero/js/A2mUpload.js');
  }

  private appendJS(src: string): void {
    if (!src) return;

    let head = document.querySelector('head');
    if (!head) return;
    if (head.innerHTML.indexOf(src) != -1) return; // imported
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    head.appendChild(script);
  }

  private appendCSS(href: string): void {
    if (!href) return;

    let head = document.querySelector('head');
    if (!head) return;
    if (head.innerHTML.indexOf(href) != -1) return; // imported
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
  }
}
