import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from './store'
import { createSearchParams, useNavigate } from "react-router-dom";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppNavigate = () => {
    const navigate = useNavigate();
    return (url: any, params?: any) => navigate({pathname: url, search: `?${createSearchParams(params)}`});
} 