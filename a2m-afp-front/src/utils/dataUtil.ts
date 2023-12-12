
export class DataUtil {

    public static convertDataForTreeMenu( parentLable: any, idLable: any, datas: any[]){
        let temps: any[] = JSON.parse(JSON.stringify(datas));
        let rs: any[] = [];
        temps.forEach((ele: any) => {
            if (ele[parentLable] === null || ele[parentLable] === undefined){
                // let temp = {...ele};
                ele.children = this.getChildrens(ele[idLable], parentLable, temps);
                rs.push(ele);
            }
        });
        return rs;
    }

    private static getChildrens(id: any, parentLable: any, datas: any[]) {
        let temps: any[] = JSON.parse(JSON.stringify(datas));
        let rs: any[] = [];
        temps.forEach(ele => {
            if (ele[parentLable] !== null && ele[parentLable] === id) {
                let children = this.getChildrens(ele.id, parentLable, temps);
                ele.children = children;
                rs.push(ele);
            }
        });

        return rs;
    }

}