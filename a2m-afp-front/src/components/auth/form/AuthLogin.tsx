// import Checkbox from "@mui/material/Checkbox/Checkbox";
// import FormControl from "@mui/material/FormControl/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
// import Stack from "@mui/material/Stack/Stack";
// import TextField from "@mui/material/TextField/TextField";
// import { FormHelperText, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
// import Box from "@mui/material/Box/Box";
// import Button from "@mui/material/Button/Button";
import { AuthConstant } from "../../../constants/authConstant";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import { HeadersUtil } from "../../../utils/headersUtil";
import { useTranslation } from "react-i18next";

type AuthUser = {
    username: string,
    password: string
}

type ValidateFormError = {
    user: boolean,
    pass: boolean
}

export default function AuthLogin() {
    const [checked, setChecked] = useState(true)

    const { t } = useTranslation()

    const cookies = new Cookies();
    const navigate = useNavigate()
    const firstRender = useRef(false)

    const [user, setUser] = useState<AuthUser>({ username: '', password: '' })
    const [errors, setErrors] = useState<ValidateFormError>({ user: false, pass: false })

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (user.username.trim() == '' || user.password.trim() == '') {
            setErrors({
                user: user.username == '' ? true : false,
                pass: user.password == '' ? true : false
            })
            return;
        }
        const expires = new Date();
        axios.post(process.env.REACT_APP_API_URL + "/public/login", user, {
            headers: HeadersUtil.getHeaders()
        }).then((resp) => {
            const data = resp.data
            if (data.status) {
                saveRemember(user, expires, checked)
                saveToken(data.responseData.accessToken)
            } else {
                toast.error(data.message)
            }
        }).catch((error) => {
            toast.error(error)
        })
    }


    const saveRemember = (obj: AuthUser, expires: Date, checked: boolean) => {
        if (!checked) {
            cookies.remove(AuthConstant.REMEMBER_LOGIN)
            return;
        }
        expires.setDate(new Date().getDate() + AuthConstant.EXPIRES_REMEMBER)
        let data = {
            u: obj.username,
            p: obj.password
        }
        cookies.set(AuthConstant.REMEMBER_LOGIN, btoa(JSON.stringify(data)), { path: '/', expires: expires })
    }

    const saveToken = (token: string) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + AuthConstant.EXPIRES_TOKEN)
        cookies.remove(AuthConstant.ACCESS_TOKEN)
        cookies.set(AuthConstant.ACCESS_TOKEN, token, { path: '/', expires: expires })
        navigate('/dashboard', { replace: true })
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        firstRender.current = true;
    }

    // const handleBlurInput = (event: any) => {
    //     let key = event.target.name as keyof AuthUser;
    //     setErrors({
    //         ...errors,
    //         [event.target.name]: user[key] == '' ? true : false
    //     })
    // }

    useEffect(() => {
        if (firstRender.current) {
            setErrors({
                user: user.username == '' ? true : false,
                pass: user.password == '' ? true : false
            })
        }
    }, [user.username, user.password])

    useEffect(() => {
        let rememberLogin = cookies.get(AuthConstant.REMEMBER_LOGIN)
        if (rememberLogin != undefined && rememberLogin != null && rememberLogin != "") {
            let rawData
            try {
                let rawString = atob(rememberLogin);
                if (!rawString) {

                } else {
                    rawData = JSON.parse(rawString);
                }
            } catch (error) {
                console.error(error);
            }
            if (!rawData) {

            } else {
                setUser({
                    username: rawData['u'],
                    password: rawData['p']
                })
            }
        }
    }, [])
    return (
        <>
            <ToastContainer></ToastContainer>
            <form onSubmit={handleLogin}>
                {/* <FormControl sx={{ m: 1, width: '100%', marginLeft: 0, marginRight: 0 }}>
                    <TextField error={errors.user} type='text' name="username" label={t('login.form.label.account')} value={user.username} onChange={handleChangeInput} size='small' />
                    {
                        // errors.user && <FormHelperText error>{t('login.form.account.required')}</FormHelperText>
                    }
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%', marginLeft: 0, marginRight: 0 }}>
                    <TextField error={errors.pass} type='password' name="password" label={t('login.form.label.password')} value={user.password} onChange={handleChangeInput} size='small' />
                    {
                        // errors.pass && <FormHelperText error>{t('login.form.password.required')}</FormHelperText>
                    }
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label={t('login.form.label.remember')}
                    />
                    <Typography variant="subtitle1" color="primary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                        {t('login.form.label.forgot_password')}
                    </Typography>
                </Stack>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Button variant="contained" type="submit" style={{ width: '100%' }}>{t('login.form.button.signin')}</Button>
                </Box> */}
            </form>
        </>
    )
}
