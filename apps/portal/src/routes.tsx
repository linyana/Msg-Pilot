import {
  ReactNode,
} from 'react'
import {
  Navigate,
} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Dashboard,
  Login,
  Registration,
  Task,
} from './pages'

export interface RouteItem {
  id?: string;
  element?: ReactNode;
  path?: string;
  kind?: any;
  text?: string;
  isPublic?: boolean;
  icon?: ReactNode;
}

export const routes: Array<RouteItem> = [
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
    isPublic: true,
  },
  {
    id: 'registration',
    element: <Registration />,
    path: '/registration',
    isPublic: true,
  },
  {
    id: 'dashboard',
    element: <Dashboard />,
    text: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 'task',
    element: <Task />,
    text: 'Task',
    path: '/task',
    icon: <AssignmentIcon />,
  },
  {
    id: 'divider',
    kind: 'divider',
  },
  {
    kind: 'header',
    text: 'Setting',
  },
  {
    text: 'Setting',
    icon: <SettingsIcon />,
  },
]

export const pageTypes = {
  noFrame: ['', 'login', 'registration'],
}
