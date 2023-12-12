import { Constant } from "../constants/constant"
import { MarkdownUtil } from "./markdown"

export class CommonUtil {

    public static translate(jobs: any[], value: any, lang: string) {
        const element = jobs.find((e: any) => e.value === value)
        if (!element) return ""
        if (Constant.SOUTH_KOREA === lang) {
            return element.labelKr
        } else if (Constant.ENGLISH === lang) {
            return element.label
        }
    }

    public static setMaxLengthContent(content: string, maxLength: number) {
        if (!content) return ""
        if (maxLength < 0) return ""
        return content.length >= maxLength ? content.substring(0, maxLength) + "..." : content
    }

    public static checkImageType(type: string) {
        switch (type) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
            case "image/svg+xml":
                return true;
            default:
                return false;
        }
    }

    public static convertMarkdownToHtml(content: string) {
        const md = MarkdownUtil.getInstance();
        return md.render(content)
    }

}