import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { HeadersUtil } from '../utils/headersUtil'

export default function RoleGuard({ children }: any) {
    const location = useLocation()
    const url = location.pathname
    const navigate = useNavigate()
    const [roles, setRoles] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/sys/sys0201/getRoles.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        }).then(async resp => {
            setRoles(resp.data.responseData)
        }).catch(error => {
            navigate("/not-permission", { replace: true })
        })
    }, [])

    const checkRole = (roles: any[]) => {
        if (roles.length > 0) {
            let menus: string[] = []
            let hasPerm = roles.some((role) => {
                if (role) {
                    let roleByMenu = role.split('$');
                    menus.push(roleByMenu[0])
                    if (roleByMenu[0] !== "" && roleByMenu[0] !== "/") {
                        return url.startsWith(roleByMenu[0]) && roleByMenu[1].includes('Y');
                    }
                }
            });
            // if (url == Constant.PREFIX_URL || url == (Constant.PREFIX_URL + "/")) {
            //     if (menus.indexOf("") > -1 || menus.indexOf("/") > -1) {
            //         return true
            //     }
            // }
            if (hasPerm) {
                return true
            }
        } else {
            return false
        }
    }

    return (
        checkRole(roles) ? children : roles.length && <Navigate to='/not-permission' replace></Navigate>
    )
}