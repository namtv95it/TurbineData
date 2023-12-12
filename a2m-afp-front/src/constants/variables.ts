export class VariablesConstant {
    public static readonly GENDER = [
        { label: "Active", value: "Y", labelKr: "활동적인" },
        { label: "Inactive", value: "N", labelKr: "비활성" }
    ]

    public static readonly SAMPLE = [
        { label: "All", value: "null", labelKr: "모두" },
        { label: "Java", value: "JAVA", labelKr: "자바" },
        { label: "Python", value: "PYTHON", labelKr: "파이썬" },
        { label: ".Net", value: "NET", labelKr: ".그물" },
        { label: "C++", value: "C", labelKr: "C++" }
    ]

    public static readonly STATUS = [
        { label: "Actived", value: "02-03", labelKr: "활동적인" },
        { label: "Disabled", value: "02-02", labelKr: "장애가 있는" },
        { label: "Locked", value: "02-01", labelKr: "잠김" },
    ]

    public static readonly MENU_STATUS = [
        { label: "Active", value: "Y", labelKr: "활동적인" },
        { label: "Inactive", value: "N", labelKr: "멈추다" }
    ]

    public static readonly DEFAULT_MENU_STATUS = "N"

    public static readonly DEFAULT_COMM_CODE_STATUS = "N"

    public static readonly COMM_CD_STATUS = [
        { label: "Active", value: 'Y', labelKr: "활동적인" },
        { label: "Inactive", value: 'N', labelKr: "멈추다" }
    ]

    public static readonly SEARCH_STATUS = [
        { label: "All", value: "null", labelKr: "모두" },
        { label: "Actived", value: "02-03", labelKr: "활동적인" },
        { label: "Disabled", value: "02-02", labelKr: "장애가 있는" },
        { label: "Locked", value: "02-01", labelKr: "잠김" },
    ]

    public static readonly GEN = [
        { label: "Male", value: "1", labelKr: "남성" },
        { label: "Female", value: "0", labelKr: "여성" }
    ]
}