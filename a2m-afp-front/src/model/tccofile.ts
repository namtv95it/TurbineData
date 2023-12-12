export class TccoFile {
    atchFleSeq: string | null = "";
    fleKey?: string | null;
    fleTp?: string | null;
    flePath?: string | null;
    fleNm?: string | null;
    newFleNm?: string | null;
    fleSz?: string | null;
    createdBy?: string | null;
    createdDate?: any | null;
    updatedBy?: string | null;
    updatedDate?: string | null;

    public fromMap(data: any): any {
        if (!data) return null;
        this.atchFleSeq = data['ATCH_FLE_SEQ'];
        this.fleKey = data['FLE_KEY'];
        this.fleTp = data['FLE_TP'];
        this.flePath = data['FLE_PATH'];
        this.fleNm = data['FLE_NM'];
        this.newFleNm = data['NEW_FLE_NM'];
        this.fleSz = data['FLE_SZ'];
        this.createdBy = data['CREATED_BY'];
        this.createdDate = data['CREATED_DATE'];
        this.updatedBy = data['UPDATED_BY'];
        this.createdDate = data['UPDATED_DATE'];

        return this;
    }

    public toMap(): any {
        if (!this) return null;

        return {
            'ATCH_FLE_SEQ': this.atchFleSeq,
            'FLE_KEY': this.fleKey,
            'FLE_TP': this.fleTp,
            'FLE_PATH': this.flePath,
            'FLE_NM': this.fleNm,
            'NEW_FLE_NM': this.newFleNm,
            'FLE_SZ': this.fleSz,
            'CREATED_BY': this.createdBy,
            'CREATED_DATE': this.createdDate,
            'UPDATED_BY': this.updatedBy,
            'UPDATED_DATE': this.updatedDate
        };
    }

    public fromObject(data: any): TccoFile {
        if (!data) return this;
        Object.assign(this, data);

        return this;
    }

    constructor(data?: any) {
        Object.assign(this, data);
    }
}