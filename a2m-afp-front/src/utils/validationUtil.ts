export class ValidationUtil {

    public static isEmail(email?: string) {
        if(email === null || email === undefined) return false
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email)
    }

    public static isPhone(phone?: string, length?: number) {
        if(phone === null || phone === undefined) return false
        return length === undefined ? new RegExp(/^[0-9]+$/).test(phone) : new RegExp(/^[0-9]+$/).test(phone) && phone.length === length
    }

}