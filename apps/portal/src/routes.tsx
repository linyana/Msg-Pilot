import {
  ReactNode,
} from 'react'
import {
  Navigate,
} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import {
  Account,
  Connections,
  Dashboard,
  Login,
  Registration,
  Task,
} from './pages'

export interface IRouteType {
  id?: string;
  element?: ReactNode;
  path?: string;
  kind?: any;
  text?: string;
  isPublic?: boolean;
  isNoConnection?: boolean;
  isNoFrame?: boolean;
  isNoNavigate?: boolean;
  icon?: ReactNode;
  children?: IRouteType[]
}

export const routes: Array<IRouteType> = [
  {
    id: 'not-found',
    path: '*',
    element: <Navigate to="/login" />,
    isPublic: true,
  },
  {
    id: 'login',
    element: <Login />,
    path: '/login',
    isNoFrame: true,
    isPublic: true,
  },
  {
    id: 'registration',
    element: <Registration />,
    path: '/registration',
    isNoFrame: true,
    isPublic: true,
  },
  {
    id: 'connections',
    element: <Connections />,
    path: '/connections',
    isNoConnection: true,
    isNoNavigate: true,
  },
  {
    id: 'dashboard',
    element: <Dashboard />,
    text: 'Dashboard',
    path: 'dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 'task',
    element: <Task />,
    text: 'Tasks',
    path: 'tasks',
    icon: <AssignmentIcon />,
  },
  {
    id: 'divider',
    kind: 'divider',
  },
  {
    id: 'header',
    kind: 'header',
    text: 'Setting',
  },
  {
    id: 'setting',
    text: 'Settings',
    path: 'settings',
    icon: <SettingsIcon />,
    children: [
      {
        id: 'setting/account',
        element: <Account />,
        text: 'Account',
        path: 'settings/account',
        icon: <AdminPanelSettingsIcon />,
      },
    ],
  },
]
