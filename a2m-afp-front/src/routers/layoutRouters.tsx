import React from 'react'
import Dashboard from '../components/pages/Dashboard';
import AuthGuard from '../guard/authGuard';
import Layout from '../components/layout/Layout';
import { systemRouters } from './systemRouters';
import { samRouters } from './samRouters';
import Profile from '../components/pages/profile/Profile';
import RoleGuard from '../guard/roleGuard';
import Threads from '../components/pages/thr/Thr_0101';
import { afpRouters } from './afpRouters';

export const layoutRouters: any = {
  path: "/",
  element: <AuthGuard><Layout /></AuthGuard>,
  children: [
    { path: "dashboard", element: <Dashboard /> },
    ...systemRouters,
    ...samRouters,
    ...afpRouters,
    { path: "profile", element: <Profile /> }
  ]
}
