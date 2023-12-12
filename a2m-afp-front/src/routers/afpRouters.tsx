import { lazy } from "react";
import RoleGuard from "../guard/roleGuard";
import Pro_0101 from "../components/pages/pro/Pro_0101";
import Threads from "../components/pages/thr/Thr_0101";
import Ann_0101 from "../components/pages/ann/Ann_0101";
import Doc0101 from "../components/pages/doc/doc0101/Doc0101";
import Doc0201 from "../components/pages/doc/doc0201/Doc0201";
import Download from "../components/pages/download/Download";
import Doc0401 from "../components/pages/doc/doc0401/Doc0401";
import Doc0301 from "../components/pages/doc/doc0301/Doc0301";
import DownloadPage from "../components/pages/download/downlPage/DownloadPage";
import Bmk_0101 from "../components/pages/bmk/Bmk_0101";
import RequestNewLib from "../components/pages/request/RequestNewLib";

export const afpRouters: any = [
    { path: "project", element: <RoleGuard><Pro_0101 /></RoleGuard> },
    { path: "threads", element: <RoleGuard><Threads /></RoleGuard> },
    // { path: "ann", element: <RoleGuard><Ann_0101 /></RoleGuard> },
    { path: "ann", element: <Ann_0101 /> },
    { path: "doc/doc0101", element: <RoleGuard><Doc0101/></RoleGuard> },
    { path: "doc/doc0201", element: <RoleGuard><Doc0201/></RoleGuard> },
    { path: "doc/doc0301", element: <RoleGuard><Doc0301/></RoleGuard> },
    { path: "doc/doc0401", element: <RoleGuard><Doc0401/></RoleGuard> },
    { path: "/download", element: <RoleGuard><Download/></RoleGuard> },
    { path: "/downloadProj", element: <RoleGuard><DownloadPage/></RoleGuard> },
    { path: "/request-new-lib", element: <RoleGuard><RequestNewLib/></RoleGuard> }
    // {
    //     path: "doc", element: <RoleGuard><Sam0102 /></RoleGuard>, 
    //     children: [
    //         { path: "button-sample", element: <ButtonSample /> },
    //         { path: "input-sample", element: <InputSample /> },
    //     ]
    // },
]