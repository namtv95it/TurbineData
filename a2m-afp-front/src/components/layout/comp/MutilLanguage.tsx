import { Constant } from '../../../constants/constant';
import LangKR from '../../../assets/i18n/icons/south-korea.png'
import LangEN from '../../../assets/i18n/icons/kingdom.png'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function MutilLanguage() {
    const [lang, setLang] = useState('')
    const { t, i18n } = useTranslation()

    function handleChange(lang: string) {
        localStorage.setItem(Constant.LANGUAGE, lang)
        setLang(lang)
        i18n.changeLanguage(lang)
    }

    useEffect(() => {
        setLang(localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA)
    }, [])


    return (
        <div className="dropdown ms-1 topbar-head-dropdown header-item">
            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle shadow-none" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img id="header-lang-img" src={lang == Constant.ENGLISH ? LangEN : LangKR} alt="Header Language" height="30" className="rounded" />
            </button>
            <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item notify-item language py-2 cus-cursor" data-lang="en" title="English" onClick={() => handleChange(Constant.ENGLISH)}>
                    <img src={require("../../../assets/images/flags/kingdom.png")} alt="user-image" className="me-2 rounded" height="25" />
                    <span className="align-middle">English</span>
                </a>
                <a className="dropdown-item notify-item language cus-cursor" data-lang="sp" title="South Korea" onClick={() => handleChange(Constant.SOUTH_KOREA)}>
                    <img src={require("../../../assets/images/flags/south-korea.png")} alt="user-image" className="me-2 rounded" height="25" />
                    <span className="align-middle">South Korea</span>
                </a>
            </div>
        </div>
    )
}
