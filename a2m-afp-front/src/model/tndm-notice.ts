import { TccoFile } from './tccofile';

export class TndmNotice {
  index?: number;
  id: number = 0;
  noticeTitle: string = "";
  content: any;
  popupYn?: string;
  popupFrom?: any;
  popupTo?: any;
  outYn?: string;
  deptCode?: string;
  deptName?: string;
  isDeleted?: boolean;
  createdBy?: string;
  createdDate?: any;
  updatedBy?: string;
  updatedDate?: any;
  isEdited?: boolean;
  viewCount?: number;
  attachment?: Array<TccoFile>;
  filesToAdd?: Array<TccoFile>;
  filesToDelete?: Array<TccoFile>;
  createTimeFrom?: string;
  createTimeTo?: string;
  nameKr?: string;
  nameEn?: string;
  nameCh?: string;
  position?: string;
  publicYn: boolean = false;
  noticeType: number = 1;
  is_always?: boolean;
  commentCount?: number;


  currentPage?: number = 1;
  imgPath?: string

  thumbnail?: string;
  noticeSub: string = "";


  public fromMap?(data: any): TndmNotice | null {
    if (!data) return null;
    this.id = data['ID'];
    this.noticeTitle = data['NOTICE_TITLE'];
    this.content = data['CONTENT'];
    this.popupYn = data['POPUP_YN'] ?? 'N';
    this.popupFrom = data['POPUP_FROM'];
    this.popupTo = data['POPUP_TO'];
    this.outYn = data['OUT_YN'] ?? 'N';
    this.deptCode = data['DEPT_CODE'];
    this.deptName = data['DEPT_NAME'];
    this.isDeleted = data['IS_DELETED'];
    this.is_always = data['IS_ALWAYS'];
    this.createdBy = data['CREATED_BY'];
    this.createdDate = data['CREATED_DATE'];
    this.updatedBy = data['UPDATED_BY'];
    this.updatedDate = data['UPDATED_DATE'];
    this.isEdited = data['IS_EDITED'];
    this.viewCount = data['VIEW_COUNT'];
    const attachment: any = !data['attachment']
      ? null
      : data['attachment'];
    this.attachment = !attachment
      ? null
      : attachment.map((obj: any) => new TccoFile().fromMap(obj));
    const filesToAdd: any = !data['filesToAdd']
      ? null
      : data['filesToAdd'];
    this.filesToAdd = !filesToAdd
      ? null
      : filesToAdd.map((obj: any) => new TccoFile().fromMap(obj));
    const filesToDelete: any = !data['filesToDelete']
      ? null
      : data['filesToDelete'];
    this.filesToDelete = !filesToDelete
      ? null
      : filesToDelete.map((obj: any) => new TccoFile().fromMap(obj));
    this.nameKr = data['NAME_KR'];
    this.nameEn = data['NAME_EN'];
    this.nameCh = data['NAME_CH'];
    this.position = data['POSITION'];
    this.publicYn = data['PUBLIC_YN'];
    this.noticeType = data['NOTICE_TYPE'];
    this.commentCount = data['commentCount'];
    this.thumbnail = data['IMG_PATH'];
    this.noticeSub = data['NOTICE_SUBSCRIPTION'];

    return this;
  }

  public toMap?(): any {
    if (!this) return null;

    return {
      ID: this.id,
      NOTICE_TITLE: this.noticeTitle,
      CONTENT: this.content,
      POPUP_YN: this.popupYn,
      POPUP_FROM: this.popupFrom,
      POPUP_TO: this.popupTo,
      OUT_YN: this.outYn,
      DEPT_CODE: this.deptCode,
      DEPT_NAME: this.deptName,
      IS_DELETED: this.isDeleted,
      CREATED_BY: this.createdBy,
      CREATED_DATE: this.createdDate,
      UPDATED_BY: this.updatedBy,
      UPDATED_DATE: this.updatedDate,
      IS_EDITED: this.isEdited,
      IS_ALWAYS: this.is_always,
      VIEW_COUNT: this.viewCount,
      attachment: !this.attachment
        ? []
        : this.attachment.map((file: any) => file.toMap()),
      filesToAdd: !this.filesToAdd
        ? []
        : this.filesToAdd.map((file: any) => file.toMap()),
      filesToDelete: !this.filesToDelete
        ? []
        : this.filesToDelete.map((file: any) => file.toMap()),
      NAME_KR: this.nameKr,
      NAME_EN: this.nameEn,
      NAME_CH: this.nameCh,
      CREATE_TIME_FROM: this.createTimeFrom,
      CREATE_TIME_TO: this.createTimeTo,
      POSITION: this.position,
      "PUBLIC_YN": this.publicYn,
      "NOTICE_TYPE": this.noticeType,
      commentCount: this.commentCount,
      NOTICE_SUBSCRIPTION: this.noticeSub,

    };
  }

  public fromObject?(data: any): TndmNotice {
    if (!data) return this;
    Object.assign(this, data);

    return this;
  }
}
