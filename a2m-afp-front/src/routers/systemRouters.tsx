import { lazy } from "react";
import RoleGuard from "../guard/roleGuard";

const MenuMng = lazy(() => import("../components/pages/sys/Sys0101/MenuMng"));
const RoleMng = lazy(() => import("../components/pages/sys/Sys0201/RoleMng"));
const UserMng = lazy(() => import("../components/pages/sys/Sys0301/UserMng"));
const CommCode = lazy(() => import("../components/pages/sys/Sys0401/ComCode"));
const Sys0501 = lazy(() => import("../components/pages/sys/Sys0501/Sys0501"));


export const systemRouters: any = [
    { path: "sys/sys0101", element: <RoleGuard><MenuMng /></RoleGuard> },
    { path: "sys/sys0201", element: <RoleGuard><RoleMng /></RoleGuard> },
    { path: "sys/sys0301", element: <RoleGuard><UserMng /></RoleGuard> },
    { path: "sys/sys0401", element: <RoleGuard><CommCode /></RoleGuard> },
    { path: "sys/sys0501", element: <RoleGuard><Sys0501 /></RoleGuard> }
]